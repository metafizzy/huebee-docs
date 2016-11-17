deploy:
	surge build huebee.buzz

zip:
	rm -rf build/huebee-docs.zip
	cp -r build huebee-docs
	zip -rq build/huebee-docs.zip huebee-docs/
	rm -rf huebee-docs

reset:
	rm -rf build/

gulp:
	gulp

gulp-export: reset
	gulp export
	make zip

prod: gulp-export gulp deploy
