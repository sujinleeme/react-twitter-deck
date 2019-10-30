init:
	git clone https://github.com/sujinleeme/react-twitter-deck.git
	rm -rf .git
	git init

install:
	yarn && cd server && yarn install && cd ../client && yarn install

heroku:
	git push heroku master --force
	
uninstall:
	rm -rf package-lock.json
	rm -rf yarn.lock 
	rm -r node_modules
	cd client
	rm -rf package-lock.json
	rm -rf yarn.lock
	rm -r node_modules
	cd ../server
	rm -rf package-lock.json
	rm -rf yarn.lock
	rm -r node_modules

git:
	git add .
	git commit -m "$m"
	git push -u origin master