describe('jquery-impromptu', function() {

	// ====================================================================================
	// ====================================================================================
	describe('utilities', function(){

		// ====================================================================================
		describe('extend', function(){

			it('should extend an object non recursive', function(){				
				var o1 = { foo: 'foo', bar: 'bar' },
					o2 = { foo: 'foo2' },
					o3 = { foo: 'foo3', foobar: 'foobar' },
					result = Impromptu._.extend(false, o1,o2,o3),
					compare = { foo: 'foo3', bar: 'bar', foobar: 'foobar' };

				expect(result).toEqual(compare);

				o1 = { foo: { a:1, b:2 }, bar: [1,2,3,4,5] };
				o2 = { foo: { a: -1, c: 3 } };
				o3 = { bar: [9,8,7] };
				result = Impromptu._.extend(false, o1,o2,o3);
				compare = { foo: { a: -1, c: 3 }, bar: [9,8,7] };
					
				expect(result).toEqual(compare);
			});

			it('should extend an object recursively', function(){				
				var o1 = { foo: 'foo', bar: 'bar' },
					o2 = { foo: 'foo2' },
					o3 = { foo: 'foo3', foobar: 'foobar' },
					result = Impromptu._.extend(true, o1,o2,o3),
					compare = { foo: 'foo3', bar: 'bar', foobar: 'foobar' };

				expect(result).toEqual(compare);

				o1 = { foo: { a:1, b:2 }, bar: [1,2,3,4,5] };
				o2 = { foo: { a: -1, c: 3 } };
				o3 = { bar: [9,8,7] };
				result = Impromptu._.extend(true, o1,o2,o3);
				compare = { foo: { a: -1, b: 2, c: 3 }, bar: [9,8,7] };
					
				expect(result).toEqual(compare);
			});
		});

		// ====================================================================================
		describe('event', function(){

			it('should create a native event', function(){
				var result = Impromptu._.event('click'),
					compare = 'object';
				
				expect(result).toBeDefined();
				expect(typeof result).toBe(compare);
				expect(result.type).toBe('click');
			});

			it('should create a custom event', function(){
				var result = Impromptu._.event('impromptu:test'),
					compare = 'object';
				
				expect(result).toBeDefined();
				expect(typeof result).toBe(compare);
				expect(result.type).toBe('impromptu:test');
			});

			it('should attach data to an event', function(){
				var result = Impromptu._.event('impromptu:test', {test1: 'foobar'}),
					compare = 'foobar';
				
				expect(result.test1).toBe(compare);
			});
		});

		// ====================================================================================
		describe('query', function(){
			beforeEach(function(){
				$('body').append('<div id="dummyels" style="display:none">'+
					'<form action="" method="post" class="dummyels-form">'+
						'<label class="field"><input type="text" name="test1" value="test val 1"></label>'+
						'<label class="field"><input type="password" name="test2" value="test val 2"></label>'+
						'<label class="field"><input type="file" name="test3"></label>'+
						'<label class="field"><input type="checkbox" name="test4" value="test val 4 - a"></label>'+
						'<label class="field"><input type="checkbox" name="test4" value="test val 4 - b" checked></label>'+
						'<label class="field"><input type="checkbox" name="test4" value="test val 4 - c"></label>'+
						'<label class="field"><input type="checkbox" name="test4" value="test val 4 - d" checked></label>'+
						'<label class="field"><input type="checkbox" name="test4" value="test val 4 - e"></label>'+
						'<label class="field"><input type="radio" name="test5" value="test val 5 - a"></label>'+
						'<label class="field"><input type="radio" name="test5" value="test val 5 - b" checked></label>'+
						'<label class="field"><input type="radio" name="test5" value="test val 5 - c"></label>'+
						'<label class="field"><textarea name="test6">test val 6</textarea></label>'+
						'<label class="field">'+
							'<select name="test7">'+
								'<option value="test val 7 - a">'+
								'<option value="test val 7 - b">'+
								'<option value="test val 7 - c" selected>'+
							'</select>'+
						'</label>'+
						'<label class="field">'+
							'<select name="test8" multiple>'+
								'<option value="test val 8 - a">'+
								'<option value="test val 8 - b" selected>'+
								'<option value="test val 8 - c" selected>'+
							'</select>'+
						'</label>'+
					'</form>'+
				'</div>');
			});
			afterEach(function(){
				$('#dummyels').remove();
			});

			// ====================================================================================
			describe('constructor', function(){

				it('should find elements with a css selector', function(){
					var result = Impromptu._.query('#dummyels'),
						compare = 1;
					
					expect(result).toBeDefined();
					expect(result.length).toBe(compare);
				});

				it('should accept a single Node', function(){
					var result = Impromptu._.query(document.getElementById('dummyels')),
						compare = 1;
					
					expect(result.length).toBe(compare);
				});

				it('should accept a NodeList', function(){
					var result = Impromptu._.query(document.getElementById('dummyels').querySelectorAll('label')),
						compare = 14;
					
					expect(result.length).toBe(compare);
				});

				it('should accept an html string and build a document fragment', function(){
					var result = Impromptu._.query('<span>foo</span><span>bar</span><div>foobar</div>'),
						compare = 3;
					
					expect(result.length).toBe(compare);
					expect(result.nodes.length).toBe(compare);
				});
			});

			// ====================================================================================
			describe('find', function(){

				it('should find elements', function(){
					var result = Impromptu._.query('#dummyels').find('label'),
						compare = 14;
					
					expect(result.length).toBe(compare);
				});
			});

			// ====================================================================================
			describe('each', function(){
				
				it('return a result set', function(){
					var result = 0,
						compare = 14,
						els = Impromptu._.query('#dummyels form label').each(function(){ result++; });
										
					expect(els.length).toBe(compare);
				});

				it('should loop every over every found element', function(){
					var result = 0,
						compare = 14;
					
					Impromptu._.query('#dummyels form label').each(function(){ result++; });
										
					expect(result).toBe(compare);
				});
			});

			// ====================================================================================
			describe('attach', function(){

				it('should append elements to a parent', function(){
					var parent = document.getElementById('dummyels'),
						result = Impromptu._.query('<span>test append</span>').attach(parent, 'append'),
						compare = parent.lastChild;

					expect(result.nodes[0]).toBe(compare);
				});

				it('should append elements to a parent', function(){
					var parent = document.getElementById('dummyels'),
						result = Impromptu._.query('<span>test append</span>').attach(parent, 'prepend'),
						compare = parent.firstChild;

					expect(result.nodes[0]).toBe(compare);
				});

			});

			// ====================================================================================
			describe('data', function(){
				
				it('return a result set', function(){
					var compare = 14,
						els = Impromptu._.query('#dummyels form label').data({ test: '1234' });
										
					expect(els.length).toBe(compare);
				});

				it('should set a data attribute', function(){
					
					Impromptu._.query('#dummyels form label').data({ test: 'asdf' });
					
					var result = document.querySelector('#dummyels form label').getAttribute('data-test'),
						compare = 'asdf';

					expect(result).toBe(compare);
				});

				it('should get a data attribute', function(){

					document.querySelector('#dummyels form label').setAttribute('data-test', 'asdf');

					var compare = 'asdf',
						result = Impromptu._.query('#dummyels form label').data('test');
					

					expect(result).toBe(compare);
				});
			});

			// ====================================================================================
			describe('css', function(){
				
				it('return a result set', function(){
					var compare = 14,
						els = Impromptu._.query('#dummyels form label').css({ color: 'rgb(255, 0, 0)' });
										
					expect(els.length).toBe(compare);
				});

				it('should set a css property', function(){
					
					Impromptu._.query('#dummyels form label').css({ color: 'rgb(255, 0, 0)' });
					
					var result = document.querySelector('#dummyels form label').style.color,
						compare = 'rgb(255, 0, 0)';

					expect(result).toBe(compare);
				});

				it('should get a css property', function(){

					document.querySelector('#dummyels form label').style.color = 'rgb(255, 0, 0)';

					var compare = 'rgb(255, 0, 0)',
						result = Impromptu._.query('#dummyels form label').css('color');
					

					expect(result).toBe(compare);
				});
			});

			// ====================================================================================
			describe('cls', function(){
				
				it('should find the class name', function(){
					var compare = true,
						result = Impromptu._.query('#dummyels form label').cls('has', 'field');
										
					expect(result).toBe(compare);
				});

				it('should not find the class name', function(){
					var compare = false,
						result = Impromptu._.query('#dummyels form label').cls('has', 'foobar');
										
					expect(result).toBe(compare);
				});

				it('should add the class to the elemnts', function(){
					var compare = true,
						els = Impromptu._.query('#dummyels form label').cls('add', 'foobar'),
						result = els.cls('has', 'foobar');
									
					expect(result).toBe(compare);
				});

				it('should remove the class to the elemnts', function(){
					var compare = false,
						els = Impromptu._.query('#dummyels form label').cls('remove', 'field'),
						result = els.cls('has', 'field');
									
					expect(result).toBe(compare);
				});	
			});

			// ====================================================================================
			describe('animate', function(){
				describe('with Imprompt.fx false', function(){

					beforeEach(function(){
						Impromptu.fx = false;
					});

					afterEach(function(){
						Impromptu.fx = true;
					});

					it('should set css properties', function(){
						
						Impromptu._.query('#dummyels form label').animate({ width: 200, opacity: 0.5 }, 0);
						
						var result = document.querySelector('#dummyels form label').style.opacity,
							compare = '0.5';

						expect(result).toBe(compare);
					});
				});

				describe('with Imprompt.fx true', function(){

					beforeEach(function(done){
						Impromptu._.query('#dummyels form label').animate({ width: 200, opacity: 0.5 }, 100, function(){ done(); });
					});

					it('should set css properties', function(){
						var result = document.querySelector('#dummyels form label').style.opacity,
							compare = '0.5';

						expect(result).toBe(compare);
					});
				});
			});

			// ====================================================================================
			describe('serialize', function(){
				
				it('return an object with selected values', function(){
					var compare = {
							test1: 'test val 1',
							test2: 'test val 2',
							test3: '',
							test4: ['test val 4 - b','test val 4 - d'],
							test5: 'test val 5 - b',
							test6: 'test val 6',
							test7: 'test val 7 - c',
							test8: ['test val 8 - b','test val 8 - c']
						},
						result = Impromptu._.query('#dummyels form').serialize();
										
					expect(result).toEqual(compare);
				});

			});

			// ====================================================================================
			describe('on', function(){

				describe('add native event', function(){
					var spyEventCalled;

					beforeEach(function(done){
						spyEventCalled = false;
						
						Impromptu._.query('body').on('click', function(){ spyEventCalled = true; done(); });
						
						document.body.dispatchEvent(Impromptu._.event('click'));
					});

					it('should fire event', function(){
						expect(spyEventCalled).toBe(true);
					});
				});

				describe('add custom event', function(){
					var spyEventCalled;

					beforeEach(function(done){
						spyEventCalled = false;
						
						Impromptu._.query('body').on('impromptu:test', function(){ spyEventCalled = true; done(); });
						
						document.body.dispatchEvent(Impromptu._.event('impromptu:test'));
					});

					it('should fire event', function(){
						expect(spyEventCalled).toBe(true);
					});
				});
			});

			// ====================================================================================
			describe('off', function(){

				describe('remove native event', function(){
					var spyEventCalled;

					beforeEach(function(done){
						spyEventCalled = false;
						var evtfn = function(){ spyEventCalled = true; done(); };

						Impromptu._.query('body').on('click', evtfn);

						Impromptu._.query('body').off('click', evtfn);
						
						document.body.dispatchEvent(Impromptu._.event('click'));

						// since it should haven been called and should happen quickly, end this test
						setTimeout(function(){ if(!spyEventCalled){ done(); }}, 10);
					});

					it('should not fire event', function(){
						expect(spyEventCalled).not.toBe(true);
					});
				});

				describe('remove custom event', function(){
					var spyEventCalled;

					beforeEach(function(done){
						spyEventCalled = false;
						var evtfn = function(){ spyEventCalled = true; done(); };

						Impromptu._.query('body').on('impromptu:test', evtfn);

						Impromptu._.query('body').off('impromptu:test', evtfn);
						
						document.body.dispatchEvent(Impromptu._.event('impromptu:test'));

						// since it should haven been called and should happen quickly, end this test
						setTimeout(function(){ if(!spyEventCalled){ done(); }}, 10);
					});

					it('should not fire event', function(){
						expect(spyEventCalled).not.toBe(true);
					});
				});

			});

			// ====================================================================================
			describe('trigger', function(){
				describe('emit native event', function(){
					var spyEventCalled;

					beforeEach(function(done){
						spyEventCalled = false;
						
						Impromptu._.query('body').on('click', function(){ spyEventCalled = true; done(); });
						
						Impromptu._.query('body').trigger('click');
					});

					it('should fire event', function(){
						expect(spyEventCalled).toBe(true);
					});
				});

				describe('emit custom event', function(){
					var spyEventCalled;

					beforeEach(function(done){
						spyEventCalled = false;
						
						Impromptu._.query('body').on('impromptu:test', function(){ spyEventCalled = true; done(); });
						
						Impromptu._.query('body').trigger(Impromptu._.event('impromptu:test'));
					});

					it('should fire event', function(){
						expect(spyEventCalled).toBe(true);
					});
				});
			});
		});

	});

	// ====================================================================================
	// ====================================================================================
	describe('base structure', function(){

		// ====================================================================================
		describe('basic initialization', function() {

			beforeEach(function() {			
				$.fx.off = true; // for our testing lets turn off fx
			});

			afterEach(function() {
				$.prompt.close();
			});

			it('should be defined', function() {
				
				expect($.prompt).not.toBeUndefined();
			});

			it('should generate markup', function() {
				var expectedTitle = 'This is a title',
					expectedText = 'This is a test';

				$.prompt(expectedText, { title: expectedTitle });

				expect($('.jqibox')).toExist();
				expect($('.jqifade')).toExist();
				expect($('.jqi')).toExist();
				expect($('.jqi .jqititle')).toHaveText(expectedTitle);
				expect($('.jqi .jqimessage')).toHaveText(expectedText);
			});

		});


		// ====================================================================================
		describe('button creation', function() {

			beforeEach(function() {			
				$.fx.off = true; // for our testing lets turn off fx
			});

			afterEach(function() {
				$.prompt.close();
			});


			it('should generate buttons from hash', function() {

				$.prompt('This is a test', {
					buttons: { Ok:true, Cancel:false }
				});
				var okBtn = $('#jqi_state0_buttonOk'),
					cancelBtn = $('#jqi_state0_buttonCancel');

				expect($('.jqibutton')).toHaveLength(2);

				expect(okBtn).toExist();
				expect(cancelBtn).toExist();

				expect(okBtn).toHaveText('Ok');
				expect(cancelBtn).toHaveText('Cancel');

				expect(okBtn).toHaveValue('true');
				expect(cancelBtn).toHaveValue('false');
			});

			it('should generate buttons from array', function() {

				$.prompt('This is a test', {
					buttons: [
						{ title: 'Ok', value: true },
						{ title: 'Cancel', value: false }
					]
				});
				var okBtn = $('#jqi_state0_buttonOk'),
					cancelBtn = $('#jqi_state0_buttonCancel');

				expect($('.jqibutton')).toHaveLength(2);

				expect(okBtn).toExist();
				expect(cancelBtn).toExist();

				expect(okBtn).toHaveText('Ok');
				expect(cancelBtn).toHaveText('Cancel');

				expect(okBtn.val()).toBe('true');
				expect(cancelBtn.val()).toBe('false');
			});

			it('should add classes to buttons', function() {

				$.prompt('This is a test', {
					buttons: [
						{ title: 'Ok', value: true, classes: ['ok1','ok2'] },
						{ title: 'Cancel', value: false, classes: 'cancel1 cancel2' }
					]
				});
				var okBtn = $('#jqi_state0_buttonOk'),
					cancelBtn = $('#jqi_state0_buttonCancel');

				expect(okBtn).toHaveClass('ok1');
				expect(okBtn).toHaveClass('ok2');

				expect(cancelBtn).toHaveClass('cancel1');
				expect(cancelBtn).toHaveClass('cancel2');
			});

			it('should add classes to buttons from classes obj', function() {

				$.prompt('This is a test', {
					buttons: [
						{ title: 'Ok', value: true, classes: ['ok1','ok2'] },
						{ title: 'Cancel', value: false, classes: 'cancel1 cancel2' }
					],
					classes: { button: 'testclass' }
				});
				var okBtn = $('#jqi_state0_buttonOk'),
					cancelBtn = $('#jqi_state0_buttonCancel');

				expect(okBtn).toHaveClass('testclass');
				expect(cancelBtn).toHaveClass('testclass');
			});

			it('should default correct button', function() {

				$.prompt('This is a test', {
					buttons: [
						{ title: 'Ok', value: 1 },
						{ title: 'Cancel', value: 2 },
						{ title: 'Another', value: 3 }
					],
					focus: 1
				});
				var okBtn = $('#jqi_state0_buttonOk'),
					cancelBtn = $('#jqi_state0_buttonCancel'),
					anotherBtn = $('#jqi_state0_buttonAnother');

				expect(okBtn).not.toHaveClass('jqidefaultbutton');
				expect(cancelBtn).toHaveClass('jqidefaultbutton');
				expect(anotherBtn).not.toHaveClass('jqidefaultbutton');
			});

			it('should default correct button when focus on an input', function() {

				$.prompt('This is a test <input type="text" id="testInput" />', {
					buttons: [
						{ title: 'Ok', value: 1 },
						{ title: 'Cancel', value: 2 },
						{ title: 'Another', value: 3 }
					],
					focus: '#testInput',
					defaultButton: 1
				});
				var okBtn = $('#jqi_state0_buttonOk'),
					cancelBtn = $('#jqi_state0_buttonCancel'),
					anotherBtn = $('#jqi_state0_buttonAnother');

				expect(okBtn).not.toHaveClass('jqidefaultbutton');
				expect(cancelBtn).toHaveClass('jqidefaultbutton');
				expect(anotherBtn).not.toHaveClass('jqidefaultbutton');
			});

		});

		// ====================================================================================
		describe('state creation', function() {

			beforeEach(function() {			
				$.fx.off = true; // for our testing lets turn off fx
			});

			afterEach(function() {
				$.prompt.close();
			});

			it('should create a single state from string', function() {

				$.prompt('This is a test');
				
				expect($('.jqistate')).toExist();
			});

			it('should create states from hash', function() {
				var states = {
					s1: { html: 'state 1' },
					s2: { html: 'state 2' },
					s3: { html: 'state 3' }
				};

				$.prompt(states);
				
				expect($('.jqistate')).toHaveLength(3);

				expect($('#jqistate_s1 .jqimessage')).toHaveText(states.s1.html);
				expect($('#jqistate_s2 .jqimessage')).toHaveText(states.s2.html);
				expect($('#jqistate_s3 .jqimessage')).toHaveText(states.s3.html);
			});

			it('should create states from array', function() {
				var states = [
					{ html: 'state 1' },
					{ html: 'state 2' },
					{ html: 'state 3' }
				];

				$.prompt(states);
				
				expect($('.jqistate')).toHaveLength(3);

				expect($('#jqistate_0 .jqimessage')).toHaveText(states[0].html);
				expect($('#jqistate_1 .jqimessage')).toHaveText(states[1].html);
				expect($('#jqistate_2 .jqimessage')).toHaveText(states[2].html);
			});

			it('should show the first state automatically', function() {

				// we can't reliably determine which entry is the first with a hash, js doesn't preserve order
				var states = [
					{ html: 'state 1' },
					{ html: 'state 2' },
					{ html: 'state 3' }
				];

				$.prompt(states);

				expect($('#jqistate_0')).toHaveCss({display:'block'});
				expect($('#jqistate_1')).toHaveCss({display:'none'});
				expect($('#jqistate_2')).toHaveCss({display:'none'});
			});

			it('should name states properly when name specified', function() {
				var states = [
					{ name: 's1', html: 'state 1' },
					{ name: 's2', html: 'state 2' },
					{ name: 's3', html: 'state 3' }
				];

				$.prompt(states);
				
				expect($('#jqistate_s1')).toExist();
				expect($('#jqistate_s2')).toExist();
				expect($('#jqistate_s3')).toExist();
			});
		});

	}); // base structure


	// ====================================================================================
	// ====================================================================================
	describe('api methods', function() {
		var states = [
				{ name: 's1', html: 'state 1' },
				{ name: 's2', html: 'state 2' },
				{ name: 's3', html: 'state 3' }
			];

		beforeEach(function() {			
			$.fx.off = true; // for our testing lets turn off fx
		});

		afterEach(function() {
			$.prompt.close();
		});


		// ====================================================================================
		describe('$.prompt.setDefaults()', function() {
			it('should change the default values', function() {
				var origDefs = $.extend(true, {}, $.prompt.defaults),
					overrides = { prefix: 'myjqi', classes: { box: 'boxclass' } };
				
				$.prompt.setDefaults(overrides);

				expect($.prompt.defaults.prefix).toBe(overrides.prefix);
				expect($.prompt.defaults.classes.box).toBe(overrides.classes.box);
				expect($.prompt.defaults.speed).toBe(origDefs.speed);

				$.prompt.defaults = origDefs;
			});
		});
		
		// ====================================================================================
		describe('$.prompt.setStateDefaults()', function() {
			it('should change the default state values', function() {
				var origDefs = $.extend(true, {}, $.prompt.defaults),
					overrides = { title: 'My Title', position: { width: 123 } };
				
				$.prompt.setStateDefaults(overrides);

				expect($.prompt.defaults.state.title).toBe(overrides.title);
				expect($.prompt.defaults.state.position.width).toBe(overrides.position.width);
				expect($.prompt.defaults.state.focus).toBe(origDefs.state.focus);

				$.prompt.defaults = origDefs;
			});
		});

		// ====================================================================================
		describe('$.prompt.get()', function() {
			it('should return the prompt jquery object', function() {
				
				$.prompt('This is a test');

				var actualResult = $.prompt.get(),
					expectedResult = $('.jqi');

				expect(actualResult[0]).toBe(expectedResult[0]);
			});
		});

		// ====================================================================================
		describe('$.prompt.getState()', function() {
			it('should return the state jquery object', function() {

				$.prompt(states);
				
				var actualResult = $.prompt.getState('s2'),
					expectedResult = $('#jqistate_s2');

				expect(actualResult[0]).toBe(expectedResult[0]);
			});
		});

		// ====================================================================================
		describe('$.prompt.getCurrentState()', function() {
			it('should return the current state jquery object', function() {

				$.prompt(states);
				
				var actualResult = $.prompt.getCurrentState(),
					expectedResult = $('#jqistate_s1');

				expect(actualResult[0]).toBe(expectedResult[0]);
			});

			it('should return the current state jquery object after a state change', function() {

				$.prompt(states);
				$.prompt.goToState('s2');
				var actualResult = $.prompt.getCurrentState(),
					expectedResult = $('#jqistate_s2');

				expect(actualResult[0]).toBe(expectedResult[0]);
			});
		});

		// ====================================================================================
		describe('$.prompt.getCurrentStateName()', function() {
			it('should return the current state name', function() {

				$.prompt(states);
				
				var actualResult = $.prompt.getCurrentStateName(),
					expectedResult = 's1';

				expect(actualResult).toBe(expectedResult);
			});

			it('should return the current state name after a state change', function() {

				$.prompt(states);
				$.prompt.goToState('s2');
				var actualResult = $.prompt.getCurrentStateName(),
					expectedResult = 's2';

				expect(actualResult).toBe(expectedResult);
			});
		});

		// ====================================================================================
		describe('$.prompt.goToState()', function() {
			it('should make the requested state visible', function() {

				$.prompt(states);
				
				$.prompt.goToState('s3');

				expect($('#jqistate_s1')).toHaveCss({display:'none'});
				expect($('#jqistate_s2')).toHaveCss({display:'none'});
				expect($('#jqistate_s3')).toHaveCss({display:'block'});
			});

			it('should do nothing if the state is not available', function() {

				$.prompt(states);
				
				$.prompt.goToState('s4');

				expect($('#jqistate_s1')).toHaveCss({display:'block'});
				expect($('#jqistate_s2')).toHaveCss({display:'none'});
				expect($('#jqistate_s3')).toHaveCss({display:'none'});
			});

			it('should handle substate option', function() {

				$.prompt(states);
				
				$.prompt.goToState('s2',true);

				expect($('#jqistate_s1')).toHaveCss({display:'block'});
				expect($('#jqistate_s2')).toHaveCss({display:'block'});
				expect($('#jqistate_s3')).toHaveCss({display:'none'});

				expect($('#jqistate_s2')).toHaveClass('jqisubstate');
			});
		});

		// ====================================================================================
		describe('$.prompt.nextState()', function() {
			it('should make the next state visible', function() {
				
				$.prompt(states);
				
				$.prompt.nextState();

				expect($('#jqistate_s1')).toHaveCss({display:'none'});
				expect($('#jqistate_s2')).toHaveCss({display:'block'});
				expect($('#jqistate_s3')).toHaveCss({display:'none'});
			});

			it('should do nothing if the state is not available', function() {

				$.prompt(states);
				
				$.prompt.goToState('s3');
				$.prompt.nextState();

				expect($('#jqistate_s1')).toHaveCss({display:'none'});
				expect($('#jqistate_s2')).toHaveCss({display:'none'});
				expect($('#jqistate_s3')).toHaveCss({display:'block'});
			});
		});

		// ====================================================================================
		describe('$.prompt.prevState()', function() {
			it('should make the previous state visible', function() {
				
				$.prompt(states);
				
				$.prompt.goToState('s3');
				$.prompt.prevState();

				expect($('#jqistate_s1')).toHaveCss({display:'none'});
				expect($('#jqistate_s2')).toHaveCss({display:'block'});
				expect($('#jqistate_s3')).toHaveCss({display:'none'});
			});

			it('should do nothing if the state is not available', function() {

				$.prompt(states);
				
				$.prompt.prevState();

				expect($('#jqistate_s1')).toHaveCss({display:'block'});
				expect($('#jqistate_s2')).toHaveCss({display:'none'});
				expect($('#jqistate_s3')).toHaveCss({display:'none'});
			});
		});

		// ====================================================================================
		describe('$.prompt.addState()', function() {
			it('should add a new state as the last state', function() {
				var newState = {
					name: 's4',
					title: 's4',
					html: 'testing s4',
					buttons: { Ok:true,Cancel:false}
				};

				$.prompt(states);
				
				var $stateobj = $.prompt.addState(newState.name, newState);

				// element created?
				expect($stateobj).toExist();

				// element in the right place?
				expect($stateobj.prev()).toHaveId('jqistate_s3');

				// element visibility correct?
				expect($('#jqistate_s1')).toHaveCss({display:'block'});
				expect($stateobj).toHaveCss({display:'none'});

				// content generated ok?
				expect($stateobj.find('.jqimessage')).toHaveText(newState.html);
				expect($stateobj.find('.jqititle')).toHaveText(newState.title);
				expect($stateobj.find('.jqibutton')).toHaveLength(2);
			});

			it('should add a new state after specified state', function() {
				var newState = {
					name: 's4',
					title: 's4',
					html: 'testing s4',
					buttons: { Ok:true,Cancel:false}
				},
				afterState = 's2';

				$.prompt(states);
				
				var $stateobj = $.prompt.addState(newState.name, newState, afterState);

				expect($stateobj.prev()).toHaveId('jqistate_'+afterState);
			});
		});

		// ====================================================================================
		describe('$.prompt.removeState()', function() {
			it('should remove the specified state', function() {
				
				$.prompt(states);
				
				$.prompt.removeState('s2');

				expect($('#jqistate_s2')).not.toExist();
			});
			
			it('should display requested state', function() {

				$.prompt(states);
				
				$.prompt.removeState('s1','s3');

				expect($('#jqistate_s2')).toHaveCss({display:'none'});
				expect($('#jqistate_s3')).toHaveCss({display:'block'});
			});
			
			it('should display next state', function() {

				$.prompt(states);
				
				$.prompt.removeState('s1');

				expect($('#jqistate_s2')).toHaveCss({display:'block'});
				expect($('#jqistate_s3')).toHaveCss({display:'none'});
			});
			
			it('should display previous state', function() {

				$.prompt(states);
				$.prompt.goToState('s3');
				$.prompt.removeState('s3');

				expect($('#jqistate_s1')).toHaveCss({display:'none'});
				expect($('#jqistate_s2')).toHaveCss({display:'block'});
			});
			
		});

		// ====================================================================================
		describe('$.prompt.close()', function() {
			it('should close the prompt', function() {
				
				$.prompt(states);
				
				$.prompt.close();

				expect($('.jqibox')).not.toExist();
			});

		});

	}); // end api methods
	
	// ====================================================================================
	// ====================================================================================
	describe('api events', function() {
		var states = [
				{ name: 's1', html: 'state 1', buttons: { next: true, cancel: false } },
				{ name: 's2', html: 'state 2', buttons: { back: -1, cancel: 0, next: 1 } },
				{ name: 's3', html: 'state 3', buttons: { done: true} }
			];

		beforeEach(function() {
			$.fx.off = true; // for our testing lets turn off fx
		});

		afterEach(function() {
			$.prompt.close();
			$('.jqibox').remove();
		});

		// ====================================================================================
		describe('impromptu:loaded', function(){
			describe('running through jquery event binding', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;
					$('body').on('impromptu:loaded', '.jqibox', function(){ spyEventCalled=true; done(); });
					$.prompt(states);
				});

				it('should fire event', function(){
					expect(spyEventCalled).toBe(true);
				});
			});

			describe('passing loaded event through as option', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;
					$.prompt(states, { loaded: function(){ spyEventCalled = true; done(); } });
				});

				it('should allow event function as option parameter', function(){
					expect(spyEventCalled).toBe(true);
				});
			});
		});

		// ====================================================================================
		describe('impromptu:close', function(){

			describe('running through jquery event binding', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;
					$('body').on('impromptu:close', '.jqibox', function(){ spyEventCalled=true; done(); });
					$.prompt(states, {
						loaded: function(){
							$.prompt.close();
						}
					});
				});

				it('should fire event', function(){
					expect(spyEventCalled).toBe(true);
				});
			});

			describe('passing loaded event through as option', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;
					$.prompt(states, { 
						loaded: function(){ $.prompt.close(); },
						close: function(){ spyEventCalled = true; done(); }
					});
				});

				it('should allow event function as option parameter', function(){
					expect(spyEventCalled).toBe(true);
				});
			});

		});

		// ====================================================================================
		describe('impromptu:statechanging', function(){

			describe('running through jquery event binding', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;

					$('body').on('impromptu:statechanging', '.jqibox', function(){ spyEventCalled = true; done(); });
					$.prompt(states, {
						loaded: function(){
							$.prompt.goToState('s2');
						}
					});
				});

				it('should fire event', function(){
					expect(spyEventCalled).toBe(true);
				});
			});

			describe('passing loaded event through as option', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;

					$.prompt(states, { 
						loaded: function(){
							$.prompt.goToState('s2');
						},
						statechanging: function(){ spyEventCalled = true; done(); }
					});
				});

				it('should allow event function as option parameter', function(){
					expect(spyEventCalled).toBe(true);
				});
			});


			it('should allow preventDefault', function(){
				var spyEvent = spyOnEvent('body', 'impromptu:statechanging');

				$.prompt(states, { 
					loaded: function(){
						$.prompt.goToState('s2');
					},
					statechanging: function(e){
						e.preventDefault();
					}
				});
				
				expect(spyEvent).toHaveBeenTriggered();
				expect(spyEvent).toHaveBeenPrevented();
			});

		});

		// ====================================================================================
		describe('impromptu:statechanged', function(){

			describe('running through jquery event binding', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;

					$('body').on('impromptu:statechanged', '.jqibox', function(){ spyEventCalled = true; done(); });
					$.prompt(states, {
						loaded: function(){
							$.prompt.goToState('s2');
						}
					});
				});

				it('should fire event', function(){
					expect(spyEventCalled).toBe(true);
				});
			});

			describe('passing loaded event through as option', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;

					$.prompt(states, { 
						loaded: function(){
							$.prompt.goToState('s2');
						},
						statechanged: function(){ spyEventCalled = true; done(); }
					});
				});

				it('should allow event function as option parameter', function(){
					expect(spyEventCalled).toBe(true);
				});
			});

		});

		// ====================================================================================
		describe('impromptu:submit', function(){

			describe('running through jquery event binding', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;

					$('body').on('impromptu:submit', '.jqibox', function(){ spyEventCalled = true; done(); });
					$.prompt(states, {
						loaded: function(){
							$.prompt.getState('s1').find('.jqibutton:first').click();
						}
					});
				});

				it('should fire event', function(){
					expect(spyEventCalled).toBe(true);
				});
			});



			describe('passing submit event through as option if string message', function(){
				var spyEventCalled;

				beforeEach(function(done){
					spyEventCalled = false;

					$.prompt('Test message', { 
						loaded: function(){
							$('.jqibutton:first').click();
						},
						submit: function(){ spyEventCalled = true; done(); }
					});
				});

				it('should allow event function as option parameter', function(){
					expect(spyEventCalled).toBe(true);
				});
			});


			describe('should detect button clicked', function(){
				var btnClicked,
					msgReturned,
					formVals;

				beforeEach(function(done){

					$('body').on('impromptu:submit', '.jqibox', function(e,v,m,f){ 
						btnClicked = v; 
						msgReturned = m;
						formVals = f;
						done();
					});

					$.prompt(states, {
						loaded: function(){
							$.prompt.getState('s1').find('#jqi_s1_buttoncancel').click();
						}
					});
				});

				it('should detect button', function(){
					expect(btnClicked).toBe(false);
				});

				it('should pass the state message', function(){
					expect(msgReturned.is('.jqimessage')).toBe(true);
				});
			});

			describe('verifying form values', function(){
				var tmpStates = [],
					btnClicked,
					msgReturned,
					formVals,
					expectedValues = {
						textInput: 'my text input',
						selectSingle: 'select single 3',
						selectMulti: ['select multi 2', 'select multi 3'],
						radioInput: 'my radio yes',
						chkInput: ['my chk no', 'my chk maybe'],
						textareaInput: 'my textarea val'
					};

				tmpStates[0] = $.extend({}, states[0]);
				tmpStates[0].html = '<input type="text" name="textInput" value="my text input" />'+
									'<select name="selectSingle"><option value="select single 1">select single 1</option><option value="select single 2">select single 2</option><option value="select single 3" selected>select single 3</option></select>'+
									'<select name="selectMulti" multiple><option value="select multi1">select multi 1</option><option value="select multi 2" selected>select multi 2</option><option value="select multi 3" selected>select multi 3</option></select>';
				tmpStates[1] = $.extend({}, states[1]);
				tmpStates[1].html = '<input type="radio" name="radioInput" value="my radio yes" checked />'+
									'<input type="radio" name="radioInput" value="my radio no" />'+
									'<input type="checkbox" name="chkInput" value="my chk no" checked />'+
									'<input type="checkbox" name="chkInput" value="my chk yes" />'+
									'<input type="checkbox" name="chkInput" value="my chk maybe" checked />';
				tmpStates[3] = $.extend({}, states[3]);
				tmpStates[3].html = '<textarea name="textareaInput">my textarea val</textarea>';

				beforeEach(function(done){

					$('body').on('impromptu:submit', '.jqibox', function(e,v,m,f){ 
						btnClicked = v; 
						msgReturned = m;
						formVals = f;
						done();
					});

					$.prompt(tmpStates, {
						loaded: function(){
							$.prompt.getState('s1').find('#jqi_s1_buttonnext').click();
						}
					});
				});

				it('should pass the correct form values', function(){
					expect(formVals).toEqual(expectedValues);
				});

			});

		});

	}); // end api events

	// ====================================================================================
	// ====================================================================================
	describe('native events', function() {
		var states = [
				{ name: 's1', html: 'state 1', buttons: [{ title:'One', value: 1}, { title:'Two', value: 2}, { title:'Three', value: 3 }], focus: 1 },
				{ name: 's2', html: 'state 2', buttons: { back: -1, cancel: 0, next: 1 } },
				{ name: 's3', html: 'state 3', buttons: { done: true} }
			];

		beforeEach(function() {			
			$.fx.off = true; // for our testing lets turn off fx

		});

		afterEach(function() {
			$.prompt.close();
		});

		// ====================================================================================
		describe('keydown', function(){

			describe('on fade when persistent option true', function(){

				beforeEach(function(done){

					$.prompt(states, { 
						loaded: function(){
							var e = $.Event('keydown');
							e.keyCode = 27;
							$.prompt.jqib.trigger(e);
							done();
						},
						persistent: true
					});
				});

				it('should not close prompt', function(){
					expect($('.jqi')).toExist();
				});
			});


			describe('on fade when persistent option false', function(){

				beforeEach(function(done){

					$.prompt(states, { 
						loaded: function(){
							var e = $.Event('keydown');
							e.keyCode = 27;
							$.prompt.jqib.trigger(e);
							done();
						},
						persistent: false
					});
				});

				it('should close prompt', function(){
					expect($('.jqi')).not.toExist();
				});
			});


			describe('enter key in prompt', function(){
				var buttonTriggered = null;

				beforeEach(function(done){

					$('body').on('impromptu:submit', function(e,v){
						buttonTriggered = v;
						done();
					});

					$.prompt(states, { 
						loaded: function(){
							var e = $.Event('keydown');
							e.keyCode = 13;
							$.prompt.jqi.trigger(e);
						}
					});	
				});

				it('should trigger click on the correct button', function(){
					expect(buttonTriggered).toBe(2);
				});
			});
			
		});

		// ====================================================================================
		describe('click', function(){

			describe('fade click', function(){

				beforeEach(function(done){
					$.prompt(states, { 
						loaded: function(){
							var e = $.Event('click');
							$.prompt.jqib.trigger(e);

							done();
						},
						persistent: true
					});
				});

				it('should not close fade if persistent option true',function(){
					expect($('.jqi')).toExist();
				});
			});
			
		});

	});// end native events

});
