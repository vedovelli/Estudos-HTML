$(document).ready(function(){
	
	/**VAR**********************************************************/
	
	var linhaEditada; 
	var categoryInput = $("#category_category");

	/**TABLE SORTER*************************************************/
	
	var table = $("#category_list_table");
	
	table.tablesorter({
		headers: { 2: { sorter: false}, 3: {sorter: false} }
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

		$.getJSON( "/categorias/" + id, function( data ){
			categoryInput.val( data.category );
			$("#category_id").val( data.id );
		});
		
	};
	
	var btnExcluir_clickHandler = function(e)
	{
		var button = e.currentTarget;
		var id = $(button).data("id");
		
		apprise( 'Tem certeza que deseja excluir a categoria?', { 'verify': true, 'textYes': 'Sim', 'textNo': 'N&atilde;o' }, function(r){
			if(r)
			{
				$.ajax({
			        type: 'DELETE',
			        url: "/categorias/" + id,
			        success: function( data ){
			        	var tr = $(button).closest('tr');
						tr.fadeTo( 600, 0, function(){ // Localiza a linha na tabela, desvanece
							$(this).remove(); // Remove a linha na tabela
							showNotification('Categoria exclu&iacute;da com sucesso');
						} );
					}
			    });
			} 
		});
		
		
	};
	
	var btnSubmit_clickHandler = function(e)
	{
		
		var id = $("#category_id").val();
		var type;
		
		if(id)
		{
			type = 'PUT';
		} else {
			type = 'POST';
		}
		
		$.ajax({
	        type: type,
	        url: "/categorias",
	        data: $("#form_category").serialize(),
	        success: function( category ){
				adicionarCategoria( category );
				limpar_form();
				$("#popup_categoria").modal('hide');
			}
	    });
	};
		
	var adicionarCategoria = function( category )
	{
		var c = $.evalJSON(category);
	
		if( c.status == 'upd' )
		{
			linhaEditada.fadeTo( 600, 0, function(){ 
				
				var arr = linhaEditada.children();
				$(arr[0]).html( c.id ); // arr[0] é a célula pai de ID
				$(arr[1]).html( c.category ); // arr[1] é a célula pai de CATEGORY
				
			} ).fadeTo( 600, 1 );
			
		} else {
			
			var tr = '';
			tr += '<tr>';
			tr += '<td>'+ c.id +'</td>';
			tr += '<td>'+ c.category +'</td>';
			tr += '<td><input type="button" value="Editar" class="btn success btn_editar" data-id="'+ c.id +'" data-controls-modal="popup_categoria" data-backdrop="true" data-keyboard="true" title="Clique para EDITAR '+ c.category +' [id: '+ c.id +']"></td>';
			tr += '<td><input type="button" value="Excluir" class="btn danger btn_excluir" data-id="'+ c.id +'" title="Clique para EXCLUIR '+ c.category +' [id: '+ c.id +']"></td>';
			tr += '</tr>';
			
			$("#category_list_table").append(tr);
			
			/* Adiciona os event listeners novamente para contemplar a nova linha inserida acima
			 * http://docs.jquery.com/FAQ#Why_do_my_events_stop_working_after_an_AJAX_request.3F
			 */
			$(".btn_editar").click(function(e){
				btnEditar_clickHandler(e);
			});
			
			$(".btn_excluir").click(function(e){
				btnExcluir_clickHandler(e);
			});
			
			showNotification('Categoria inserida com sucesso');
		}
		
	};
	
	
	/**OTHER METHODS****************************************************/
	
	var limpar_form = function()
	{
		categoryInput.val("");
		categoryInput.focus();
		$("#category_id").val("");
	};
	
	var showNotification = function( htmlString )
	{
		$("#notification p").html( htmlString );
		$("#notification").animate({top: 0}, 500, '', function(){
			$(this).delay(2000).animate({top: -40}, 500);
		});
	}
	
});