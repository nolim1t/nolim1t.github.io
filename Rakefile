task :default => [:clean, :preflight] do
    if ENV['TORDEPLOY'] != nil then
        puts "TOR DEPLOY is set, so lets install"
        sh "bundle exec jekyll build"
        sh "cd _site"
        sh "scp -r * #{ENV['TORDEPLOY']}:/www"
    else
        puts "TORDEPLOY not set"
    end
end

task :preflight do
    puts "Install bundler"
    sh "bundle install"
end

task :clean do
    puts "Cleanup all stuff"
    sh "rm -fr _site"
end
