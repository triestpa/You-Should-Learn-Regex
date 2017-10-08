import Cocoa
do {
    let fileText = try String(contentsOfFile: "test.txt", encoding: String.Encoding.utf8)
    let regex = try! NSRegularExpression(pattern: "^[0-9]+$", options: [ .anchorsMatchLines ])
    let results = regex.matches(in: fileText, options: [], range: NSRange(location: 0, length: fileText.characters.count))
    let matches = results.map { String(fileText[Range($0.range, in: fileText)!]) }
    print(matches)
} catch {
    print(error)
}