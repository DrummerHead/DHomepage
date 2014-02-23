#!/usr/bin/env ruby

# Executes grunt, by default this compresses stijl.css and gedrag.js
grunt = %x[grunt]
puts grunt

css_min = File.read("temp/stijl.min.css")
js_min = File.read("temp/gedrag.min.js")
html = File.read("src/index.html")

html.gsub!(/<!-- replace with:(.*?)-->.*?<!-- end replace -->/m){ $1 }
File.write("temp/index_for_minification.html", html)
grunt = %x[grunt htmlmin]
puts grunt

html_min = File.read("temp/index.min.html")
html_min.gsub!('{{css}}'){ css_min }
html_min.gsub!('{{js}}'){ js_min }
File.write("dist/index.html", html_min)

%x[cp src/apple-* dist/]
%x[cp src/favicon.ico dist/]

puts "\n= = = = = = = = = = = = = = = = = ="
puts "DH-Home has been generated at: dist/"
puts "= = = = = = = = = = = = = = = = = = =\n\n"
