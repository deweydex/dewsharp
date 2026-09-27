// Run 2: waits 1 s so anything left over from run 1 has a chance to print into this run's output.
Console.WriteLine("run 2 start");
await Task.Delay(1000);
Console.WriteLine("run 2 end");
