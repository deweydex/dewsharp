using System.Threading.Tasks;
class P
{
    static async Task<int> Main(string[] args)
    {
        await Task.Delay(5);
        Console.WriteLine($"async Main, args={args.Length}");
        return 3;
    }
}
