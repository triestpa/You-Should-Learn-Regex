using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Linq;

namespace RegexExample
{
    class FileRegexExample
    {
        static void Main()
        {
            string text = File.ReadAllText(@"./test.txt", Encoding.UTF8);
            Regex regex = new Regex("^[0-9]+$", RegexOptions.Multiline);
            MatchCollection mc = regex.Matches(text);
            var matches = mc.OfType<Match>().Select(m => m.Value).ToArray();
            Console.WriteLine(string.Join(" ", matches));
        }
    }
}