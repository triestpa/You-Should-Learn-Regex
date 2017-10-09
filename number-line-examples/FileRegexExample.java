import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

class FileRegexExample {
  public static void main(String[] args) {
    try {
      String content = new String(Files.readAllBytes(Paths.get("test.txt")));
      Pattern pattern = Pattern.compile("^[0-9]+$", Pattern.MULTILINE);
      Matcher matcher = pattern.matcher(content);
      ArrayList<String> matchList = new ArrayList<String>();
      while (matcher.find()) {
        matchList.add(matcher.group());
      }

      System.out.println(matchList);
    } catch (IOException e) {
			e.printStackTrace();
		}
  }
}