$(document).ready(function(){
	
	/**VAR**********************************************************/
	
	var linhaEditada; 

	/**TABLE SORTER AND FILTER**************************************/
	
	var table = $("#product_list_table");
	
	table.tablesorter({
		headers: { 4: { sorter: false}, 5: {sorter: false} }
	});
	
	table.tableFilter();
	
	/**EVENT LISTENERS**********************************************/
	
	$(".btn_editar").click(function(e){
		btnEditar_clickHandler(e);
	});
	
	$(".btn_excluir").click(function(e){
		btnExcluir_clickHandler(e);
	});
	
	$("#submit_button").click(function(e) {
		btnSubmit_clickHandler(e);
    });
	
	$("#btn-novo").click(function(e) {
        limpar_form();
    });
	
	$("#form_category").keyup(function( event ){
		if( event.keyCode == 13 )
		{
			salvar_category();
		}
	});
	
	/**CALLBACKS****************************************************/
	
	var btnEditar_clickHandler = function(e)
	{
		var button = e.currentTarget;
		var id = $(button).data("id");
		linhaEditada = $(button).closest('tr');

		$.getJSON( "/produtos/" + id, function( data ){
			$("#product_title").val( data.title );
			$("#product_google_id").val( data.google_id );
			$("#product_id").val( data.id );
			$("#product_categoria").val( data.category_id );
		});
	};
	
	var btnExcluir_clickHandler = function(e)
	{
		var button = e.currentTarget;
		var id = $(button).data("id");
		
		apprise( 'Tem certeza que deseja excluir o produto?', { 'verify': true, 'textYes': 'Sim', 'textNo': 'N&atilde;o' }, function(r){
			if(r)
			{
				$.ajax({
			        type: 'DELETE',
			        url: "/produtos/" + id,
			        success: function( data ){
			        	var tr = $(button).closest('tr');
						tr.fadeTo( 600, 0, function(){ // Localiza a linha na tabela, desvanece
							$(this).remove(); // Remove a linha na tabela
							showNotification('Produto exclu&iacute;do com sucesso'); // Notificacao dentro do callback do effect
						} );
					}
			    });
			}
		});
	};
	
	var btnSubmit_clickHandler = function(e)
	{
		var id = $("#product_id").val();
		var type;
		
		if(id)
		{
			type = 'PUT';
		} else {
			type = 'POST';
		}
		
		$.ajax({
	        type: type,
	        url: "/produtos",
	        data: $("#form_product").serialize(),
	        success: function( product ){
				adicionarProduto( product );
				limpar_form();
				$("#popup_produto").modal('hide');
			}
	    });
	};
		
	var adicionarProduto = function( product )
	{
		var p = $.evalJSON(product);
		
		if( p.status == 'upd' )
		{
			linhaEditada.fadeTo( 600, 0, function(){ 
				
				var arr = linhaEditada.children();
				$(arr[0]).html( p.id ); // arr[0] é a célula pai de ID
				$(arr[1]).html( p.title ); // arr[1] é a célula pai de TITLE
				$(arr[2]).html( p.google_id ); // arr[2] é a célula pai de GOOGLE_ID
				$(arr[3]).html( p.category ); // arr[3] é a célula pai de CATEGORY
				
			} ).fadeTo( 600, 1 );
			
		} else {
			
			var tr = '';
			tr += '<tr>';
			tr += '<td>'+ p.id +'</td>';
			tr += '<td>'+ p.title +'</td>';
			tr += '<td>'+ p.google_id +'</td>';
			tr += '<td>'+ p.category +'</td>';
			tr += '<td><input type="button" value="Editar" class="btn success btn_editar" data-id="'+ p.id +'" data-controls-modal="popup_produto" data-backdrop="true" data-keyboard="true" title="Clique para EDITAR '+ p.title +' [id: '+ p.id +']"></td>';
			tr += '<td><input type="button" value="Excluir" class="btn danger btn_excluir" data-id="'+ p.id +'" title="Clique para EXCLUIR '+ p.title +' [id: '+ p.id +']"></td>';
			tr += '</tr>';
			
			$("#product_list_table").append(tr);
			
			/* Adiciona os event listeners novamente para contemplar a nova linha inserida acima
			 * http://docs.jquery.com/FAQ#Why_do_my_events_stop_working_after_an_AJAX_request.3F
			 */
			$(".btn_editar").click(function(e){
				btnEditar_clickHandler(e);
			});
			
			$(".btn_excluir").click(function(e){
				btnExcluir_clickHandler(e);
			});
			
			showNotification('Produto inserido com sucesso');
		}
		
	};
	
	
	/**OTHER METHODS****************************************************/
	
	var limpar_form = function()
	{
		$("#product_title").val("");
		$("#product_title").focus();
		$("#product_google_id").val("");
		$("#product_id").val("");
		$("#product_categoria").val("");
	};
	
	var showNotification = function( htmlString )
	{
		$("#notification p").html( htmlString );
		$("#notification").animate({top: 0}, 500, '', function(){
			$(this).delay(2000).animate({top: -40}, 500);
		});
	};
	
	var comboCategorias = function()
	{
		var comboContent = '';
		
		$.getJSON( "/categorias_json", function( data ){
			
			$(data).each(function(index, item){
				comboContent += '<option value="'+item.id+'">'+item.category+'</option>';
			});
			
			$('#product_categoria').html(comboContent);
			
		});
	}();
	
});