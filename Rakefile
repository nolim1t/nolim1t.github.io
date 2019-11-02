task :default => [:deploy] do
end

# Deploy task
task :deploy => [:clean, :preflight] do
    puts "Building _site directory"
    sh "bundle exec jekyll build"
    if ENV['TORDEPLOY'] != nil then
        puts "TOR DEPLOY is set, so lets install"
        Dir.chdir('_site') # Change directory
        sh "scp -r * #{ENV['TORDEPLOY']}:/www"
    else
        puts "TORDEPLOY not set, so not deploying"
    end
end

# Sync submodules
task :submodulesync do
    if ENV['GITHUB'] == nil then
        puts "Syncing submodules"
        sh "git submodule foreach git pull origin master"
    end
end

# Preflight task (install stuff thats needed like bundler)
task :preflight => [:submodulesync] do
    puts "Install bundler"
    sh "bundle install"
end

# Cleanup task
task :clean do
    puts "Cleanup all stuff"
    sh "rm -fr _site"
end
