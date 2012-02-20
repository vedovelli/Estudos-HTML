{include file="partial_header.tpl"}

{include file="partial_menu.tpl"}

<div class="container">
	
	<div class="page-header">
		<h2>
			<img alt="Icon Produtos" src="/view/img/rss_tag.png"/>
			Gerenciamento de Produtos
			<a href="#" id="btn-novo" class="btn primary" data-controls-modal="popup_produto" data-backdrop="true" data-keyboard="true">Novo Produto</a>
		</h2>
	</div>
	
	<table id="product_list_table" class="zebra-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Title</th>
				<th>Headline</th>
				<th>Categoria</th>
				<th width="40"></th>
				<th width="40"></th>
			</tr>
		</thead>
		<tbody>
		{foreach from=$products item=product}
			{$id=$product['id']}
			{$title=$product['title']}
			<tr style="background-color:#e2e2e2">
				<td class="id">{$id}</td>
				<td>{$title}</td>
				<td>{$product['google_id']}</td>
				<td>{$product['category']}</td>
				<td><input type="button" value="Editar" class="btn success btn_editar" data-id="{$id}" data-controls-modal="popup_produto" data-backdrop="true" data-keyboard="true" title="Clique para EDITAR {$title} [id: {$id}]"></td>
				<td><input type="button" value="Excluir" class="btn danger btn_excluir" data-id="{$id}" title="Clique para EXCLUIR {$title} [id: {$id}]"></td>
			</tr>
		{/foreach}
		</tbody>
	</table>
	
	<!-- form produto -->
	<div id="popup_produto" class="modal hide fade">
		<div class="modal-header">
			<a href="#" class="close">&times;</a>
			<h3>Adicione ou atualize um produto</h3>
		</div>
		<div class="modal-body">
			
			<form id="form_product" name="form_product" class="form-stacked">
	
				<input type="hidden" name="id" id="product_id">
				
					<div class="clearfix">
						<label for="product_title">Title</label>
						<div class="input">
							<input class="xlarge" id="product_title" name="title" size="30" type="text" />
			            </div>
					</div>
				
					<div class="clearfix">
						<label for="product_google_id">Headline</label>
						<div class="input">
							<input class="xlarge" id="product_google_id" name="google_id" size="30" type="text" />
			            </div>
					</div>
				
					<div class="clearfix">
						<label for="product_categoria">Categoria</label>
						<div class="input">
							<select class="xlarge"  id="product_categoria" name="category_id">
					        </select>
			            </div>
					</div>
			</form>
			
		</div>
		<div class="modal-footer">
			<input type="button" id="submit_button" class="btn primary" value="Salvar"/>
		</div>
	</div>
          
          
	
</div>

{include file="partial_footer.tpl" for="product"}