Console.WriteLine("Press any key to continue...");
try { var k = Console.ReadKey(); Console.WriteLine($"key {k.KeyChar}"); }
catch (Exception e) { Console.WriteLine($"ReadKey: {e.GetType().Name}: {e.Message}"); }
try { Console.Clear(); Console.WriteLine("Clear ok"); } catch (Exception e) { Console.WriteLine($"Clear: {e.GetType().Name}"); }
try { Console.ForegroundColor = ConsoleColor.Red; Console.WriteLine("ForegroundColor ok"); Console.ResetColor(); } catch (Exception e) { Console.WriteLine($"ForegroundColor: {e.GetType().Name}"); }
try { Console.WriteLine($"KeyAvailable={Console.KeyAvailable}"); } catch (Exception e) { Console.WriteLine($"KeyAvailable: {e.GetType().Name}"); }
try { Console.WriteLine($"WindowWidth={Console.WindowWidth}"); } catch (Exception e) { Console.WriteLine($"WindowWidth: {e.GetType().Name}"); }
Console.Write("Still reading lines? ");
Console.WriteLine($"got '{Console.ReadLine()}'");
