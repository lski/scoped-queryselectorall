(function() {

    
    // States whether log outputs to the console or not
    var outputLog = true;
    
    describe('query', function() {

        var eventNo = 0,
			query = lski.query; 

        it(++eventNo + ': should select 2 elements in total on page that are .child children of block-1', function() {

            var el = document.getElementById('block-1');
            var result = el.querySelectorAll('.child');
            
            expect(result.length).toBe(2);
        });
        
        it(++eventNo + ': should show the selector is relevant to the document, then excludes whats underneath the  prove element.querySelectorAll works relative from document NOT element before excluding', function() {

            var el = document.getElementById('block-1');
            var result = el.querySelectorAll('.parent .child');
            
            expect(result.length).toBe(2);
        });
        
        it(++eventNo + ': should a standard from root query', function() {

            var el = document.getElementById('block-1');
            var result = query('.parent .child');
            
            expect(result.length).toBe(2);
        });
        
        it(++eventNo + ': should a standard from root query with null', function() {

            var el = document.getElementById('block-1');
            var result = query('.parent .child', null);
            
            expect(result.length).toBe(2);
        });
		
        it(++eventNo + ': should be scoped to element query', function() {

            var el = document.getElementById('block-1');
            var result = query('.parent .child', el);
            
            expect(result.length).toBe(1);
        });
        
		it(++eventNo + ': should select all immediate children', function() {

            var el = document.getElementById('block-1');
            var result = query('> *', el);
       
            expect(result.length).toBe(3);
			expect(result[0].tagName.toLowerCase()).toBe("span");
			expect(result[1].tagName.toLowerCase()).toBe("div");
			expect(result[2].tagName.toLowerCase()).toBe("img");
        });
        
    });

    function _log() {
		
		if (outputLog) {
			
			try {
				console.log.apply(console, arguments);	
			} 
			catch (e) {
				// IE8 Hack
				var i = arguments.length, args = [];
				while (--i >= -1 && args.push('args[' + i + ']'));
				new Function('args', 'console.log(' + args.join(',') + ')')(arguments);
			}
		}
    };

})();
