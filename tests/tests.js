var assert = chai.assert;

suite('csv', function() {
	
	var v_input;
	var v_output;
   
    test('Return String', function() {
		v_input = "producto, precio";
		
        textbox_input.value = v_input;
        calculate();
        assert.isString(table_output.innerHTML);
    });
    
    test('Return Table', function() {
		v_input = ['"producto",           "precio"',
					'"camisa",             "4,3"',
					'"libro de O\"Reilly", "7,2"'
				    ].join('\n');
				    
		v_output = '<p>\n</p><table class="center" id="result">\n<tbody><tr> <td>producto</td>  <td>precio</td> </tr>\n<tr> <td>camisa</td>  <td>4,3</td> </tr>\n<tr class="error"> <td>libro de O</td>  <td>Reilly</td>  <td>7,2</td> </tr>\n</tbody></table>'
		
        textbox_input.value = v_input;
        calculate();
        assert.deepEqual(table_output.innerHTML, v_output);
    });
    
    test('Error?', function() {
		v_input = "\"Not display\" \"in this\"\n\"window\"";
		
		textbox_input.value = v_input;
		calculate();
		assert.isNotNull(result.innerHTML.match(/class=\"error\"/));
	});
	


});
