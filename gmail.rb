require 'net/imap'
require 'kconv'
require 'mail'
require 'dotenv'
Dotenv.load
imap = Net::IMAP.new('imap.gmail.com', 993, true)
imap.login(ENV["ACCOUNT"], ENV["PASSWORD"])
imap.examine('INBOX')
imap.search(["FROM","corec.jp", "SINCE", "1-Jan-2017"])
  .tap{|x| puts "search results: #{x.size}"}
  .each do |msg|
  s = imap.fetch(msg, "RFC822")[0].attr["RFC822"]
  m = Mail.new(s)
  puts "subject: #{m.subject}"
  if m.multipart?
    if m.text_part
      body = m.text_part.decoded.toutf8
      puts body
    elsif m.html_part
      body = m.html_part.decoded
      puts body
    end
  else
    body = m.body.to_s.toutf8
    puts body
  end
  # break
end