# Converts docs from a hierarchical mkdocs format
# to an ID-marked format for docusaurus
# Also tags any internal links for manual updating
# by prefacing line with "TODO:"

def get_title(f)
  s = f.index("# ")
  e = f.index("\n", s)
  f[(s+2)..(e-1)]
end

def tag_links(fs, f)
  output = []
  lines = fs.split("\n")
  lines.each do |line|
    if line.match(/\]\([^h#m].*\)/)
      output << ("TODO:" + line)
    else
      output << line
    end
  end
  output.join("\n")
end

# EXECUTION STARTS HERE

raise "Enter src and dest directories as args" if ARGV.count < 2

src_dir = ARGV[0]
dest_dir = ARGV[1]


files = `find #{src_dir} -name "*.md"`.split("\n")

# Modify and move all files

files.each do |f|
  begin
    # Get id - remove intro and .md, replace / with -
    id = f[38..-4].gsub('/', '-')
    fs = `cat #{f}`
    title = get_title(fs)
    # Generate header
    header = "---\nid: #{id}\ntitle: #{title}\nsidebar_label: #{title}\n---\n\n"

    # Replace all links in `fs` with new link format

    fs = tag_links(fs, f)

    # Concatenate header to file string
    output = header + fs

    # Write modified file to new location
    output_file = "#{dest_dir}/#{id}.md"
    File.new(output_file)
    File.open(output_file, "w") do |file|
      file.write(output)
    end

  rescue => e
    puts "id: #{id}\nError: #{e}"
  end
end
