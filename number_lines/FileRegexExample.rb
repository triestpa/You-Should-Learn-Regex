File.open("test.txt", "rb") do |f|
    test_str = f.read
    re = /^[0-9]+$/m
    test_str.scan(re) do |match|
        puts match.to_s
    end
end

