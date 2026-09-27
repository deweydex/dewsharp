// Static state test: does a static survive between runs?
public static class Counter { public static int Runs; }
public static class Program
{
    public static void Main()
    {
        Counter.Runs++;
        Console.WriteLine($"Counter.Runs = {Counter.Runs}; AppDomain static seen = {System.AppContext.GetData("spike.count") ?? "null"}");
        int prev = (int)(System.AppContext.GetData("spike.count") ?? 0);
        System.AppContext.SetData("spike.count", prev + 1);
    }
}
