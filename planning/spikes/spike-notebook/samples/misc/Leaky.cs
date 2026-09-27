// Run 1: starts a Timer and a Task.Delay continuation, then returns immediately.
var timer = new System.Threading.Timer(_ => Console.WriteLine("TIMER from run 1"), null, 300, System.Threading.Timeout.Infinite);
_ = Task.Run(async () => { await Task.Delay(400); Console.WriteLine("DELAY continuation from run 1"); });
Console.WriteLine("run 1 done");
GC.KeepAlive(timer);
