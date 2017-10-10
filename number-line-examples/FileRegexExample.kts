import java.io.File
import kotlin.text.Regex
import kotlin.text.RegexOption

val file = File("test.txt")
val content:String = file.readText()
val regex = Regex("^[0-9]+$", RegexOption.MULTILINE)
val results = regex.findAll(content).map{ result -> result.value }.toList()
println(results)