{include file="partial_header.tpl"}

{include file="partial_menu.tpl"}

<div class="container">
	
	<div class="page-header">
		<h2>
			<img alt="Icon Categorias" src="/view/img/format_list_unordered.png"/>
			Gerenciamento de Categorias
			<a href="#" id="btn-novo" class="btn primary" data-controls-modal="popup_categoria" data-backdrop="true" data-keyboard="true">Nova Categoria</a>
		</h2>
	</div>
	
	<table id="category_list_table" class="zebra-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Categoria</th>
				<th width="40"></th>
				<th width="40"></th>
			</tr>
		</thead>
		<tbody>
		{foreach from=$categories item=category}
			{$id=$category['id']}
			{$categoria=$category['category']}
			<tr style="background-color:#e2e2e2">
				<td>{$id}</td>
				<td>{$categoria}</td>
				<td><input type="button" value="Editar" class="btn success btn_editar" data-id="{$id}" data-controls-modal="popup_categoria" data-backdrop="true" data-keyboard="true" title="Clique para EDITAR {$categoria} [id: {$id}]"></td>
				<td><input type="button" value="Excluir" class="btn danger btn_excluir" data-id="{$id}" title="Clique para EXCLUIR {$categoria} [id: {$id}]"></td>
			</tr>
		{/foreach}
		</tbody>
	</table>
	
	<!-- form categoria -->
	<div id="popup_categoria" class="modal hide fade">
		<div class="modal-header">
			<a href="#" class="close">&times;</a>
			<h3>Adicione ou atualize um categoria</h3>
		</div>
		<div class="modal-body">
			
			<form id="form_category" name="form_category" class="form-stacked">
	
				<input type="hidden" name="id" id="category_id">
				
					<div class="clearfix">
						<label for="category_category">Categoria</label>
						<div class="input">
							<input class="xlarge" id="category_category" name="category" size="30" type="text" />
			            </div>
					</div>
				
			</form>
			
		</div>
		<div class="modal-footer">
			<input type="button" id="submit_button" class="btn primary" value="Salvar"/>
		</div>
	</div>
          
          
	
</div>

{include file="partial_footer.tpl" for="category"}