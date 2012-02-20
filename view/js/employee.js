$(document).ready(function(){
	
	/**VAR**********************************************************/
	
	var linhaEditada;
	
	/**TABLE SORTER AND FILTER**************************************/
	
	var table = $("#employee_list_table");
	
	table.tablesorter({
		headers: { 4: { sorter: false}, 5: {sorter: false} }
	});
	
	table.tableFilter();
	
	/**CSS OVERRIDE*************************************************/

	$(".modal").css({"width":"760px", "margin":"-150px 0 0 -380px"});
	

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
		limpar_form();
		
		$.getJSON( "/colaboradores/" + id, function( data ){
			$("#employee_id").val( data.id );
			$("#employee_nome").val( data.nome );
			$("#employee_email").val( data.email );
			$("#employee_usuario").val( data.usuario );
		} );
		
	};
	
	var btnExcluir_clickHandler = function(e)
	{
		var button = e.currentTarget;
		var id = $(button).data("id");
		
		apprise( 'Tem certeza que deseja excluir o colaborador?', { 'verify': true, 'textYes': 'Sim', 'textNo': 'N&atilde;o' }, function(r){
			if(r)
			{
				$.ajax({
			        type: 'DELETE',
			        url: "/colaboradores/" + id,
			        success: function( data ){
			        	var tr = $(button).closest('tr');
						tr.fadeTo( 600, 0, function(){ // Localiza a linha na tabela, desvanece
							$(this).remove(); // Remove a linha na tabela
							showNotification('Colaborador exclu&iacute;do com sucesso');
						} );
					}
			    });
			}
		});
	};
	
	var btnSubmit_clickHandler = function(e)
	{
		var id = $("#employee_id").val();
		var type;
		
		if(id)
		{
			type = 'PUT';
		} else {
			type = 'POST';
		}
		
		$.ajax({
	        type: type,
	        url: "/colaboradores",
	        data: $("#form_employee").serialize(),
	        success: function( employee ){
	        	adicionarColaborador( employee );
				limpar_form();
				$("#popup_employee").modal('hide');
			}
	    });
	};
		
	var adicionarColaborador = function( employee )
	{
		var e = $.evalJSON(employee);
		
		if( e.status == 'upd' )
		{
			linhaEditada.fadeTo( 600, 0, function(){ 
				
				var arr = linhaEditada.children();
				$(arr[0]).html( e.id ); // arr[0] é a célula pai de ID
				$(arr[1]).html( e.nome ); // arr[1] é a célula pai de NOME
				$(arr[2]).html( e.email ); // arr[2] é a célula pai de E-MAIL
				$(arr[3]).html( e.usuario ); // arr[2] é a célula pai de USUARIO
				
			} ).fadeTo( 600, 1 );
			
		} else {
			
			var tr = '';
			tr += '<tr>';
			tr += '<td>'+ e.id +'</td>';
			tr += '<td>'+ e.nome +'</td>';
			tr += '<td>'+ e.email +'</td>';
			tr += '<td>'+ e.usuario +'</td>';
			tr += '<td><input type="button" value="Editar" class="btn success btn_editar" data-id="'+ e.id +'" data-controls-modal="popup_employee" data-backdrop="true" data-keyboard="true" title="Clique para EDITAR '+ e.nome +' [id: '+ e.id +']"></td>';
			tr += '<td><input type="button" value="Excluir" class="btn danger btn_excluir" data-id="'+ e.id +'" title="Clique para EXCLUIR '+ e.nome +' [id: '+ e.id +']"></td>';
			tr += '</tr>';
			
			$("#employee_list_table").append(tr);
			
			/* Adiciona os event listeners novamente para contemplar a nova linha inserida acima
			 * http://docs.jquery.com/FAQ#Why_do_my_events_stop_working_after_an_AJAX_request.3F
			 */
			$(".btn_editar").click(function(e){
				btnEditar_clickHandler(e);
			});
			
			$(".btn_excluir").click(function(e){
				btnExcluir_clickHandler(e);
			});
			
			showNotification('Colaborador inserido com sucesso');
		}
		
	};
	
	/**OTHER METHODS****************************************************/
	
	var limpar_form = function()
	{
		$("#employee_id").val("");
		$("#employee_nome").focus();
		$("#employee_nome").val("");
		$("#employee_email").val("");
		$("#employee_usuario").val("");
		$("#employee_senha").val("");
	};
	
	var showNotification = function( htmlString )
	{
		$("#notification p").html( htmlString );
		$("#notification").animate({top: 0}, 500, '', function(){
			$(this).delay(2000).animate({top: -40}, 500);
		});
	}
	
});
