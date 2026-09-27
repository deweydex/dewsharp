using College;
var c = new Course("5N2927", "Programming and Design Principles");
var s = new Student("Ada", 21);
c.Enrol(s);
c.Enrol(s); // throws from Course.cs line 13, uncaught
