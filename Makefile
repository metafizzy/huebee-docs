deploy:
	surge build huebee.buzz

gulp:
	gulp

reset:
	rm -rf build/

prod: reset gulp deploy
