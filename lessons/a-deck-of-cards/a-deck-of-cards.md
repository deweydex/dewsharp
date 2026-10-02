---
title: "A deck of cards: enums, a class and a shuffle"
version: 2026.10.01.1
from: sorting-a-hand-of-cards
worlds:
  game: A game world. On this page, two players and a game of cards.
  your-own: A world of your own. On this page, a deck for a card game you know.
covers: [FOOP-LO1, FOOP-LO3, FOOP-LO7]
---

# A deck of cards: enums, a class and a shuffle

This page is an extra. It builds a deck of playing cards in C#: two enums,
a record for one card, and a class for the deck, which shuffles and deals.
It ends with a card game. It uses what the course teaches by the end of
[Interfaces: one promise, many classes](lesson:many-classes-one-promise).
It also uses `Random`, which gives random numbers. This page says what it
needs from `Random` where it first uses it, and
[Random numbers](lesson:leaving-it-to-chance) says more.

A deck of playing cards has 52 cards. Each card has a *rank*, from 2 to
Ace, and a *suit*: clubs, diamonds, hearts or spades. To *shuffle* the
deck is to mix the cards, so that nobody knows their order. To *deal* is
to give cards from the deck to the players, and a *hand* is the cards
that one player holds. Here is a hand of five cards, each one written as
text, and sorted with `Sort`. What do you think the first line will
print?

```csharp exec
id: a-card-as-text-1
var hand = new List<string>
{
    "Queen of Hearts",
    "2 of Clubs",
    "10 of Spades",
    "Ace of Diamonds",
    "King of Clubs",
};
hand.Sort();
foreach (string card in hand)
{
    Console.WriteLine(card);
}
```

```predict
type: choice

What will the first line print?

- 2 of Clubs
  - The 2 is the lowest card in the hand.
- 10 of Spades
  - Text is compared character by character, from the first.
- Ace of Diamonds
  - In some games, the Ace is the lowest card.
```

It prints `10 of Spades` first, then `2 of Clubs`, `Ace of Diamonds`,
`King of Clubs` and `Queen of Hearts`. `Sort` compares text character by
character, from the first, as on [Sorting](lesson:putting-things-in-order).
The character 1 comes before 2, and digits come before letters, so
`10 of Spades` is first. K comes before Q, so the King is before the
Queen, although a Queen is the lower card. The rule for text knows nothing
about cards.

Text has a second problem. `"Quen of Hearts"`, with a letter missing, is
text too, and the compiler has no reason to stop it. A card is not really
one piece of text. It is two values, a rank and a suit, and each of them
comes from a fixed list.

## Two fixed lists: a suit and a rank

A suit is one value from a fixed list of four. A rank is one value from a
fixed list of thirteen. On
[Designing classes](lesson:from-a-description-to-classes), a value that
must come from a fixed list became an *enum*: a type with a fixed list of
named values. Here are two.

```csharp exec
id: two-fixed-lists-1
file: SuitAndRank.cs
enum Suit
{
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

enum Rank
{
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}
```

Each value of an enum is also a whole number. On Designing classes, the
numbers counted from 0. Here, `Two = 2` chooses the number for `Two`, and
each value after it has the next number. What number do you think
`Rank.Jack` has?

```csharp exec
id: two-fixed-lists-2
Console.WriteLine((int)Rank.Two);
Console.WriteLine((int)Rank.Jack);
Console.WriteLine(Rank.Queen < Rank.King);
Console.WriteLine(string.Join(", ", Enum.GetValues<Suit>()));
Console.WriteLine($"{Enum.GetValues<Suit>().Length} suits, {Enum.GetValues<Rank>().Length} ranks");
```

```predict
type: number

What will the second line print?
```

It prints `2`, then `11`. Each value has a number one more than the value
before it, so `Jack`, the value after `Ten`, has 11. The Ace, last in the
list, has the highest number of all. In this deck, as in most card games,
the Ace is the highest card.

Because each value has a number, two values of one enum can be compared
with `<` and `>`, and their numbers decide. So `Rank.Queen < Rank.King` is
`True`. (C# prints a `bool` as `True` or `False`, with a capital letter.)

`Enum.GetValues<Suit>()` gives an array that holds every value of `Suit`,
from the lowest number to the highest. The type goes in the angle brackets, as
the type of the elements does in `List<int>`. The fourth line joins the
suits into one line: `Clubs, Diamonds, Hearts, Spades`. The last line
gives the length of each array: `4 suits, 13 ranks`.

The suits are in alphabetical order. That is also their order in the card
game bridge, from the lowest suit to the highest. Nothing on this page
needs one suit to be higher than another until *Sorting a hand*, further
down.

## A card: a record with two parts

A card only holds two values, and it has no rule to keep. On Designing
classes, a type like that was a *record*. Here is `Card`, a record with a
rank and a suit. (In `Rank Rank`, the first word is the type, and the
second is the name.) A record can have a body, in curly brackets, as a
class has. This one gives `Card` its own `ToString`.

```csharp exec
id: a-card-1
file: Card.cs
record Card(Rank Rank, Suit Suit)
{
    public override string ToString()
    {
        return $"{Rank} of {Suit}";
    }
}
```

```csharp exec
id: a-card-1-program
var queen = new Card(Rank.Queen, Suit.Hearts);
Console.WriteLine(queen);
Console.WriteLine(queen.Rank > Rank.Ten);
Console.WriteLine(queen == new Card(Rank.Queen, Suit.Hearts));
```

It prints `Queen of Hearts`, then `True` twice. A record already has a
`ToString` that shows its values, with their names. This one gives the
text that a person would say. `queen.Rank` is the card's rank, and it can
be compared with another rank.

The last line compares two cards. Each `new` makes an object, so these
are two objects. If `Card` were a class, this line would print `False`:
for a class that you write, `==` is `True` only when both sides are one
object. A record is different. C# writes an `==` for every record, and it compares the values
inside the two objects. So two cards with the same rank and the same suit
are equal, as two real cards of the same kind are.

## A deck: 52 cards in one object

A deck is more than a list of cards. It has rules: a new deck has every
card once, and a card that is dealt leaves the deck. A class can keep
rules like those in one place. Here is `Deck`. Its list of cards is
private, so only the deck's own methods can change it.

```csharp exec
id: a-deck-1
file: Deck.cs
class Deck
{
    private List<Card> _cards = new List<Card>();

    public Deck()
    {
        foreach (Suit suit in Enum.GetValues<Suit>())
        {
            foreach (Rank rank in Enum.GetValues<Rank>())
            {
                _cards.Add(new Card(rank, suit));
            }
        }
    }

    public int Count => _cards.Count;

    public Card Deal()
    {
        // The top of the deck is index 0
        Card top = _cards[0];
        _cards.RemoveAt(0);
        return top;
    }
}
```

The constructor has a loop inside a loop. The outer loop takes each suit,
and for each suit, the inner loop takes every rank. `Count` is a property
written with `=>`, as `MaxHealth => 10` was on
[Inheritance](lesson:one-parent-many-children): its value is always
`_cards.Count`, the number of cards in the list. `Deal` deals one card: it
takes the top card from the deck, and returns it. How many cards do you
expect in a new deck, and which three will be dealt first?

```csharp exec
id: a-deck-1-program
var deck = new Deck();
Console.WriteLine($"{deck.Count} cards");
for (int i = 0; i < 3; i++)
{
    Console.WriteLine(deck.Deal());
}
Console.WriteLine($"{deck.Count} cards left");
```

It prints `52 cards`, then `Two of Clubs`, `Three of Clubs` and
`Four of Clubs`, and `49 cards left`. An enum value prints as its name, so
the card is `Two of Clubs`, and not `2 of Clubs`. A new deck is in order:
all the clubs first, from the Two, then the diamonds, and so on. Each card
that `Deal` returns has left the deck.

Why 52? There are 4 suits, and for each suit the inner loop makes 13
cards: 4 × 13 = 52. A loop inside a loop meets every pair of a suit and a
rank exactly once. The rule behind 4 × 13 has a name, the *counting
principle*. A first choice can be made in 4 ways. For each of them, a second choice can be made in 13
ways. So the two choices together can be made in 4 × 13 ways. dewlab's
Python page
[Counting every outfit](https://deweydex.github.io/dewlab/tutorials/counting-every-outfit.html)
counts outfits in the same way, with tops and trousers.

What happens when a program deals one card more than the deck has? The
next cell is meant to stop with an exception. It deals 53 cards.

```csharp exec
id: a-deck-2
expect: exception
var deck = new Deck();
for (int i = 0; i < 53; i++)
{
    deck.Deal();
}
Console.WriteLine("Every card was dealt.");
```

It stopped with an exception, `ArgumentOutOfRangeException`. The message
starts `Index was out of range. Must be non-negative and less than the
size of the collection.` Under it, the report names line 21 of `Deck.cs`,
in `Deal`: the line `Card top = _cards[0];`. Then it names line 4 of the
program, which called `Deal`. After 52 deals the list is empty, and an
empty list has no index 0. The message speaks about an index and a
collection, and not about cards, because the list does not know that it
is a deck. *Looking back*, at the end of the page, asks what a deck should
do instead.

## Shuffling: every card has the same chance

A new deck is always in the same order, so every game would deal the same
cards. A game needs a shuffle. A shuffle puts the cards in an order chosen
at random, and every order must be as likely as every other.

Two scientists, Ronald Fisher and Frank Yates, described a way to
shuffle in 1938, for people working with pencil and paper. Here is the
version that programs use. It swaps cards, and it is still called the
*Fisher-Yates shuffle*.

1. Start with the last card. Choose one card at random from the whole
   deck, the last card included, and swap the two. The last place is now
   fixed: nothing moves it again.
2. Move to the card before it. Choose one card at random from the cards
   that are not fixed yet, and swap the two.
3. Do the same for each card, towards the top of the deck, until one card
   is left.

Here is `Deck` again, with that shuffle as a method, `Shuffle`. It
replaces the `Deck` above (rule 4: a class written again further down
replaces the earlier one). The swap is one line, as on
[Sorting](lesson:putting-things-in-order): `(a, b) = (b, a)` swaps the
values of `a` and `b`, because C# reads both values after the `=` before
it changes either place.

```csharp exec
id: shuffling-1
file: Deck.cs
class Deck
{
    private List<Card> _cards = new List<Card>();

    public Deck()
    {
        foreach (Suit suit in Enum.GetValues<Suit>())
        {
            foreach (Rank rank in Enum.GetValues<Rank>())
            {
                _cards.Add(new Card(rank, suit));
            }
        }
    }

    public int Count => _cards.Count;

    public Card Deal()
    {
        // The top of the deck is index 0
        Card top = _cards[0];
        _cards.RemoveAt(0);
        return top;
    }

    public void Shuffle(Random generator)    // new
    {
        for (int last = _cards.Count - 1; last > 0; last--)
        {
            // Choose only from the cards that are not fixed yet: index 0 to last
            int chosen = generator.Next(last + 1);
            (_cards[last], _cards[chosen]) = (_cards[chosen], _cards[last]);
        }
    }
}
```

`Random` is .NET's class for a *random number generator*: an object that
gives a new number each time you ask it. `generator.Next(last + 1)` asks
it for a whole number from 0 to `last`, and each one is as likely as the
others. `Next` never gives the number in its brackets, which is why the
code asks for `last + 1`.

The deck does not make its own `Random`. The program gives it one, as an
argument. This program gives it `new Random(42)`. The 42 is the
generator's *seed*: the number that its calculation starts from. With the
same seed, a generator gives the same numbers on every run. So this
program deals the same five cards every time, and this page can say what
they are. A game would give the deck `Random.Shared`, a generator that
.NET makes for every program. .NET chooses its seed, and it is different
on every run, so every game is different.

```csharp exec
id: shuffling-1-program
var deck = new Deck();
deck.Shuffle(new Random(42));
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(deck.Deal());
}
```

With seed 42, the five cards are the `Five of Diamonds`, the
`Queen of Spades`, the `Five of Hearts`, the `Seven of Hearts` and the
`Ten of Diamonds`. Can you change the seed, and deal again? Or give the
deck `Random.Shared`, and run the cell twice?

<details class="dl-answer"><summary>What each line of Shuffle does</summary>

- `public void Shuffle(Random generator)`: the method takes the generator
  as a parameter, and returns nothing. It changes the deck's own list.
- `for (int last = _cards.Count - 1; last > 0; last--)`: `last` is the
  place to fix, from the last index of the list to 1. `last--` subtracts 1
  from `last` after each pass, as `i++` adds 1 to `i`. When every place
  but index 0 is fixed, the card at index 0 is the one that is left, so
  the loop stops there.
- `int chosen = generator.Next(last + 1);`: an index from 0 to `last`.
  These are the places that are not fixed yet, and `last` is one of them,
  so a card can stay where it is.
- `(_cards[last], _cards[chosen]) = (_cards[chosen], _cards[last]);`: the
  swap. When `chosen` is the same as `last`, the card swaps with itself,
  and nothing moves.

</details>

The shuffle makes one choice for each place, from the last place to the
second. For the last place, it can choose any of the 52 cards. For the
place before it, it chooses from the cards that are not fixed, one card
fewer, and so on. By the counting principle, it can run in
52 × 51 × … × 2 ways, and each way gives a different order. That is
exactly the number of orders that a deck can be in.
([Namespaces and class libraries](lesson:namespaces-and-libraries)
prints that number in full, with `BigInteger`.) So each order of the deck
comes from exactly one way, and every order is as likely as every other.

### A closer look: is every order as likely?

Why choose only from the cards that are not fixed yet? Here is a shuffle
that looks as good, and is simpler: take each place, from the first to
the last, and swap its card with any card in the deck. We call it the
*simple shuffle*. If you did the challenge at the end of
[Random numbers](lesson:leaving-it-to-chance), you have met it already.

The cell below holds both shuffles, for a deck of three cards, A, B and
C. Each one is a static method, as `Math.Max` is, so a program calls it
through the class's name: `Shuffles.Simple(...)`. The class says `static`
too. A *static class* holds only static members, and a program never
makes an object of it.

```csharp exec
id: every-order-1
file: Shuffles.cs
static class Shuffles
{
    public static void Simple(string[] cards, Random generator)
    {
        for (int place = 0; place < cards.Length; place++)
        {
            int chosen = generator.Next(cards.Length);    // any card at all
            (cards[place], cards[chosen]) = (cards[chosen], cards[place]);
        }
    }

    public static void FisherYates(string[] cards, Random generator)
    {
        for (int last = cards.Length - 1; last > 0; last--)
        {
            int chosen = generator.Next(last + 1);    // not a fixed card
            (cards[last], cards[chosen]) = (cards[chosen], cards[last]);
        }
    }
}
```

Three cards can be in six orders: ABC, ACB, BAC, BCA, CAB and CBA. The
program shuffles A, B and C 60,000 times with each shuffle, and counts how
often each order appears. If every order is as likely as every other, each
count will be near 10,000. The program prints one line for each order,
with two counts: the simple shuffle's first, then Fisher and Yates's.
Before you run it, which column do you expect to be near 10,000 on every
line?

```csharp exec
id: every-order-1-program
string[] orders = { "ABC", "ACB", "BAC", "BCA", "CAB", "CBA" };
var simple = new Dictionary<string, int>();
var fisherYates = new Dictionary<string, int>();
foreach (string order in orders)
{
    simple[order] = 0;
    fisherYates[order] = 0;
}

var generator = new Random(1);
for (int round = 0; round < 60000; round++)
{
    string[] cards = { "A", "B", "C" };
    Shuffles.Simple(cards, generator);
    string key = string.Join("", cards);
    simple[key] = simple[key] + 1;

    cards = new string[] { "A", "B", "C" };
    Shuffles.FisherYates(cards, generator);
    key = string.Join("", cards);
    fisherYates[key] = fisherYates[key] + 1;
}

Console.WriteLine($"If every order is as likely: about {60000 / orders.Length} each");
Console.WriteLine("order: simple, Fisher-Yates");
foreach (string order in orders)
{
    Console.WriteLine($"{order}: {simple[order]}, {fisherYates[order]}");
}
```

```predict
type: choice

Which column will be near 10,000 on every line?

- Both columns
  - Both shuffles swap cards chosen at random.
- Only the simple shuffle's column
  - It can choose any card at every step, so it mixes more.
- Only the Fisher-Yates column
  - It never moves a card that is fixed.
```

The first line says what "as likely" would look like: about `10000` of
each order. The Fisher-Yates column is near that on every line, from
`9901` to `10087`. The simple shuffle's column is not. `ACB`, `BAC` and
`BCA` appear `10955`, `11078` and `11018` times, and the other three
orders fewer: `8993`, `9110` and `8846`. Does the same happen with another
seed, in the place of the 1 in `new Random(1)`?

The difference does not come from chance. We can count it, with no random
numbers at all. The simple shuffle makes three choices, and each choice is
one of three cards. The next program tries every way that those three
choices can be made, one by one, with a loop inside a loop inside a loop,
and counts the order that each way gives. Its three swaps are the simple
shuffle's, with `first`, `second` and `third` in the place of the three
random choices.

```csharp exec
id: every-order-2
string[] orders = { "ABC", "ACB", "BAC", "BCA", "CAB", "CBA" };
var ways = new Dictionary<string, int>();
foreach (string order in orders)
{
    ways[order] = 0;
}
int everyWay = 0;

for (int first = 0; first < 3; first++)
{
    for (int second = 0; second < 3; second++)
    {
        for (int third = 0; third < 3; third++)
        {
            string[] cards = { "A", "B", "C" };
            (cards[0], cards[first]) = (cards[first], cards[0]);
            (cards[1], cards[second]) = (cards[second], cards[1]);
            (cards[2], cards[third]) = (cards[third], cards[2]);
            string key = string.Join("", cards);
            ways[key] = ways[key] + 1;
            everyWay = everyWay + 1;
        }
    }
}

foreach (string order in orders)
{
    Console.WriteLine($"{order}: {ways[order]} ways");
}
Console.WriteLine($"Every way: {everyWay}");
```

There are `27` ways in all, and they are not shared evenly: `ACB`, `BAC`
and `BCA` have `5` ways each, and the other three orders have `4`. Each
way is as likely as every other, so an order with 5 ways appears more
often than an order with 4. These are the same three orders that had the
largest counts in the column for the simple shuffle.

The counting principle says why it must be so. Three choices, each of
three cards, make 3 × 3 × 3 = 27 ways, and 27 ways cannot be shared
evenly between 6 orders, because 27 is not a multiple of 6. So the simple
shuffle cannot make every order as likely, whatever numbers its generator
gives. The Fisher-Yates shuffle chooses from 3 cards, and then from 2:
3 × 2 = 6 ways, exactly one for each order. That is why `Shuffle` chooses only from
the cards that are not fixed yet.

The simple shuffle compiles, runs, and deals hands that look shuffled.
One hand, or ten, would never show the problem. Only counting shows it.

A `Random` has a shuffle of its own too: `generator.Shuffle(cards)`
shuffles an array, and it uses the same idea as Fisher and Yates.
[Random numbers](lesson:leaving-it-to-chance) uses it. A deck keeps a
`List<Card>`, not an array, which is one reason for `Deck` to have its
own `Shuffle`. The other reason is this page: you have now seen how a
shuffle makes every order as likely, and why the simple shuffle cannot.

## Sorting a hand

A player who is dealt a hand usually puts it in order. `List<Card>` has a
`Sort` method. The next cell is meant to stop with an exception. Why do
you think it will stop?

```csharp exec
id: sorting-a-hand-1
expect: exception
var hand = new List<Card>
{
    new Card(Rank.Queen, Suit.Hearts),
    new Card(Rank.Two, Suit.Spades),
    new Card(Rank.Ace, Suit.Hearts),
};
hand.Sort();
Console.WriteLine(string.Join(", ", hand));
```

It stopped with an exception, `InvalidOperationException`, on line 7, the
line with `Sort`. The message says `Failed to compare two elements in the
array.` Under it, a line says what caused it:
`It was caused by System.ArgumentException: At least one object must implement IComparable.`
`Sort` asks two cards to compare themselves, through a promise, and `Card`
keeps no such promise yet. The message names `IComparable`, an older form
of the same promise, without the angle brackets.

On [Interfaces](lesson:many-classes-one-promise), the promise was
`IComparable<T>`, with one method, `CompareTo`. In `Card`, it compares
this card with another card, called `other`. It returns a number below 0
when this card comes before `other`, 0 when the two are in the same
place, and a number above 0 when this card comes after `other`. A record
can implement an interface, as a class can: the interface's name comes
after a colon, after the record's brackets.

Here is `Card` again, and it keeps the promise now. It replaces the `Card`
above (rule 4), and `Deck` uses this one too.

```csharp exec
id: sorting-a-hand-2
file: Card.cs
record Card(Rank Rank, Suit Suit) : IComparable<Card>
{
    public override string ToString()
    {
        return $"{Rank} of {Suit}";
    }

    public int CompareTo(Card other)
    {
        // The rank decides. The suit decides only between two cards of one rank.
        if (Rank != other.Rank)
        {
            return Rank.CompareTo(other.Rank);
        }
        return Suit.CompareTo(other.Suit);
    }
}
```

The program deals five cards from a shuffled deck, prints them, sorts
them, and prints them again.

```csharp exec
id: sorting-a-hand-2-program
var deck = new Deck();
deck.Shuffle(new Random(42));
var hand = new List<Card>();
for (int i = 0; i < 5; i++)
{
    hand.Add(deck.Deal());
}
Console.WriteLine(string.Join(", ", hand));
hand.Sort();
Console.WriteLine(string.Join(", ", hand));
```

The first line is the hand as it was dealt: the same five cards as in
*Shuffling*, because the seed is the same. The second line is the hand in
order: `Five of Diamonds, Five of Hearts, Seven of Hearts, Ten of
Diamonds, Queen of Spades`. The two Fives have the same rank, so the suit
decided between them, and `Diamonds` comes before `Hearts` in `Suit`.

Inside `Card`, `Rank` on its own is this card's rank, and `other.Rank` is
the rank of the other card. `Rank.CompareTo(other.Rank)` compares the two
by their numbers: every enum has a `CompareTo` of its own, as `int` has.
`CompareTo` in `Card` asks about the rank first. Only when the two ranks
are the same does it ask about the suit.

### Your turn: a hand in suits

Many players hold a hand in suits: all the clubs together, then the
diamonds, the hearts and the spades, each suit in order of rank. Can you
change `CompareTo` in the first cell below, so that `Sort` puts a hand in
that order? The program under it has a hand of six cards.

```csharp exec
id: your-turn-1
file: Card.cs
record Card(Rank Rank, Suit Suit) : IComparable<Card>
{
    public override string ToString()
    {
        return $"{Rank} of {Suit}";
    }

    public int CompareTo(Card other)
    {
        if (Rank != other.Rank)
        {
            return Rank.CompareTo(other.Rank);
        }
        return Suit.CompareTo(other.Suit);
    }
}
```

```csharp exec
id: your-turn-1-program
var hand = new List<Card>
{
    new Card(Rank.Queen, Suit.Hearts),
    new Card(Rank.Two, Suit.Spades),
    new Card(Rank.Ace, Suit.Hearts),
    new Card(Rank.Seven, Suit.Clubs),
    new Card(Rank.Two, Suit.Hearts),
    new Card(Rank.King, Suit.Clubs),
};
hand.Sort();
Console.WriteLine(string.Join(", ", hand));
```

```inputs
string.Join(", ", hand)
new Card(Rank.Ace, Suit.Clubs).CompareTo(new Card(Rank.Two, Suit.Spades)) < 0     // the Ace of Clubs first?
new Card(Rank.Two, Suit.Hearts).CompareTo(new Card(Rank.Queen, Suit.Hearts)) < 0  // the Two of Hearts first?
new Card(Rank.Ten, Suit.Spades).CompareTo(new Card(Rank.Ten, Suit.Spades))        // the same rank and suit
```

```hint
after: 2 runs
In the `CompareTo` above, which part decides first, the rank or the suit?
Which one should decide first for a hand in suits?
```

```solution
var hand = new List<Card>
{
    new Card(Rank.Queen, Suit.Hearts),
    new Card(Rank.Two, Suit.Spades),
    new Card(Rank.Ace, Suit.Hearts),
    new Card(Rank.Seven, Suit.Clubs),
    new Card(Rank.Two, Suit.Hearts),
    new Card(Rank.King, Suit.Clubs),
};
hand.Sort();
Console.WriteLine(string.Join(", ", hand));

record Card(Rank Rank, Suit Suit) : IComparable<Card>
{
    public override string ToString()
    {
        return $"{Rank} of {Suit}";
    }

    public int CompareTo(Card other)
    {
        // The suit decides. The rank decides only between two cards of one suit.
        if (Suit != other.Suit)
        {
            return Suit.CompareTo(other.Suit);
        }
        return Rank.CompareTo(other.Rank);
    }
}
---
`Seven of Clubs, King of Clubs, Two of Hearts, Queen of Hearts, Ace of
Hearts, Two of Spades`. The clubs come first, then the hearts, then the one
spade. This hand has no diamonds. Inside each suit, the rank decides. The
only change is the order of the two questions: the suit is asked first,
and the rank only between two cards of one suit.

The last input compares a card with a card of the same rank and suit, and
gives `0`: neither comes first.

The solution writes `Card` again, below its program (rule 4), and C# uses
this one in place of yours. In one file, C# wants the statements first and
the types after them.
```

## A card game

<div class="dl-world" data-world="game">

In *Highest card wins*, two players each take a card from the top of a
shuffled deck. The higher rank wins the round. Two cards of the same rank
are a draw, and nobody wins that round. Aoife and Kwame play five rounds.
The program deals the cards, but it does not decide who wins. Can you add
the lines that decide, and add 1 to the winner's total?

```csharp exec
id: a-card-game--game
var deck = new Deck();
deck.Shuffle(new Random(12));
int aoifeWins = 0;
int kwameWins = 0;
for (int round = 1; round <= 5; round++)
{
    Card aoife = deck.Deal();
    Card kwame = deck.Deal();
    Console.WriteLine($"Round {round}: {aoife} against {kwame}");
    // Who wins this round?
}
Console.WriteLine($"Aoife {aoifeWins}, Kwame {kwameWins}");
```

```inputs
aoifeWins
kwameWins
```

```hint
after: 2 runs
Where in the loop do both cards exist? There, two ranks can be compared
with `>` and `<`, as `Rank.Queen < Rank.King` was near the top of the
page.
```

```solution
var deck = new Deck();
deck.Shuffle(new Random(12));
int aoifeWins = 0;
int kwameWins = 0;
for (int round = 1; round <= 5; round++)
{
    Card aoife = deck.Deal();
    Card kwame = deck.Deal();
    Console.WriteLine($"Round {round}: {aoife} against {kwame}");
    if (aoife.Rank > kwame.Rank)
    {
        aoifeWins = aoifeWins + 1;
    }
    else if (kwame.Rank > aoife.Rank)
    {
        kwameWins = kwameWins + 1;
    }
}
Console.WriteLine($"Aoife {aoifeWins}, Kwame {kwameWins}");
---
`Aoife 3, Kwame 1`. Round 3 is a draw: both players have an Ace. The
`else if` checks the second case. When neither rank is higher, neither
total changes. A plain `else`, in the place of the `else if`, would give
every draw to Kwame.
```

What would change if a draw were decided by the suit, as `CompareTo` did
in *Sorting a hand*? And what could the game do after five rounds, with
most of the deck still there?

</div>

<div class="dl-world" data-world="your-own">

Do you know a game with a different deck? Uno has four colours and the
numbers 0 to 9. There are tarot decks, *Happy Families*, and the cards
from board games. What does one card in your deck hold? Which of its
parts come from a fixed list, and could be enums? Can you write the
enums, a record for one card and a deck class with `Shuffle` and `Deal` in
the first cell? Then, in the second, can you deal a hand of five cards and
print it?

Give your types names of their own, such as `UnoCard` and `UnoDeck`. A
type with the same name as one on this page replaces it (rule 4). If your
card is called `Card`, this page's `Deck` tries to make your card from a
rank and a suit, and your cell does not compile.

```csharp exec
id: a-card-game--your-own
// My deck: enums, a record for one card, and a class for the deck.
```

```csharp exec
id: a-card-game-program--your-own
// A shuffled deck, and a hand of five cards from it.
```

</div>

## Looking back

The first cell of this page wrote each card as text, and the sort put
`10 of Spades` first, and the King before the Queen. Which part of this
page's code puts a Two before a Ten, and a Queen before a King: the
enums, the record, or `CompareTo`? And the deck: why do you think
`Shuffle` takes a `Random` as a parameter, and does not make its own?

The 53rd card stopped the program with an exception whose message spoke
about an index, and not about cards. What should a deck do when a program
asks it for a card that it does not have?

A challenge: *Higher or lower*. The program shows a card, and the player
says whether the next card will be higher or lower. The score grows by 1
each time the next card does what the player said, and the game stops the
first time it does not. What should happen when the two cards have the
same rank? You decide. The challenge opens in your own notebook, with the
enums, `Card` and `Deck` from this page after the program. (In one file,
C# needs the program's statements before any type, so the types come
last.) The program gives the deck `Random.Shared`, so every game is
different. Can you write the loop?

```csharp challenge
var deck = new Deck();
deck.Shuffle(Random.Shared);
Card current = deck.Deal();
int score = 0;
Console.WriteLine($"The first card is the {current}.");
// Ask: higher or lower? Deal the next card, and compare its rank with
// the rank of the current card. Did it do what the player said? Then
// the next card becomes the current card.
Console.WriteLine($"Your score: {score}");

enum Suit
{
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

enum Rank
{
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}

record Card(Rank Rank, Suit Suit)
{
    public override string ToString()
    {
        return $"{Rank} of {Suit}";
    }
}

class Deck
{
    private List<Card> _cards = new List<Card>();

    public Deck()
    {
        foreach (Suit suit in Enum.GetValues<Suit>())
        {
            foreach (Rank rank in Enum.GetValues<Rank>())
            {
                _cards.Add(new Card(rank, suit));
            }
        }
    }

    public int Count => _cards.Count;

    public Card Deal()
    {
        Card top = _cards[0];
        _cards.RemoveAt(0);
        return top;
    }

    public void Shuffle(Random generator)
    {
        for (int last = _cards.Count - 1; last > 0; last--)
        {
            int chosen = generator.Next(last + 1);
            (_cards[last], _cards[chosen]) = (_cards[chosen], _cards[last]);
        }
    }
}
```

Everything on this page runs here, on the page, and nothing in it needs
Visual Studio. Any program cell can be downloaded as a Visual Studio
project, and it prints the same there.

There is no practice page for this extra. Next, if you came here from
[Interfaces](lesson:many-classes-one-promise),
[Composition: objects inside other objects](lesson:objects-inside-objects)
builds classes whose fields hold other objects, as `Deck` holds its cards.
The extra [LINQ: asking a list a question](lesson:asking-a-list-a-question)
sorts a list by a key, with no `CompareTo` at all.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Bostock, M. (2012). *Fisher–Yates Shuffle*.
<https://bost.ocks.org/mike/shuffle/>. A page that shows the Fisher-Yates
shuffle as it happens, one element at a time, in moving pictures, and
compares it with slower ways to shuffle. Its code is in JavaScript, but
the pictures need no code at all.

Microsoft. *Enumeration types* (C# reference).
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum>.
How to write an enum, how to choose the number behind each value, as
`Two = 2` does, and how to convert between a value and its number.

Microsoft. *Random.Shuffle Method* (.NET API reference).
<https://learn.microsoft.com/en-us/dotnet/api/system.random.shuffle>.
.NET has a shuffle of its own, for an array, which
[Random numbers](lesson:leaving-it-to-chance) uses. It is written for
people who already use C#.

Microsoft. *IComparable&lt;T&gt; Interface* (.NET API reference).
<https://learn.microsoft.com/en-us/dotnet/api/system.icomparable-1>.
The promise that `Sort` uses. Its *Remarks* part has a table of the three
kinds of number that `CompareTo` returns.
