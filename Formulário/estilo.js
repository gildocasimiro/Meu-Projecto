$("document").ready(function(){
    /* Produto recebe o foco ao chamar o sistema */
    $("#nmProduto").chosen().trigger('chosen:activate');
    
    /* Quando o produto for selecionado, a quantidade recebe o foco */
    $("#nmProduto").change(function(){
       $("#qtProduto").focus();
    })
    
    /* Adiciona a máscara ao input do valor do produto ( plugin mask utilizado ) */
    $('#vlProduto').mask("00000.00",{reverse: true});

    /* Adiciona a máscara ao input de quantidade do produto ( plugin mask utilizado ) */
    $('#qtProduto').mask("00000",{reverse: true});

    $("#btnAdicionarProduto").on('click', function($e){
       /* Evita que o evento ocorra */
       $e.preventDefault();

       /* Adiciona os produtos somente se o formulário for preenchido */
       if(validaForm())
       {
          /* Declarando a variável tb */
          var tb;

          /* preenchendo informações na variável tb para inserção no tbody da tabela */
          tb = "<tr><td>" + $("#nmProduto").val() + "</td>" +
               "<td>" + $("#qtProduto").val() + "</td>" +
               "<td class=\"text-right pr-5\">" + ($("#vlProduto").val() * 1).toFixed(2) + "</td>" +
               "<td class=\"text-right pr-5\">" + ( $("#vlProduto").val() * $("#qtProduto").val() ).toFixed(2) + "</td>" +
               "<td><button class=\"btn btn-light btn-sm delete text-danger\">✖</button></td></tr>";
          
          /* Adiciona a variável tb acima que contém os dados do produto no tbody da tabela.
             Estas informações são inseridas no final do tbody */
          $("tbody").append(tb);

          /* Após inserção da linha do produto, os valores do pedido são atualizados */
          atualizaVlPedido();

          /* Se existir mais que 1 item no pedido, é removido a classe 
             invisible do foot da tabela, mostrando assim o valor total do pedido */
          if($(".table-produtos tbody tr").length > 0)
             $(".table-produtos tfoot").removeClass("invisible");
         
          /* As 3 linhas abaixo redefinem os campos de entrada do produto para deixando-os vazios*/
          $("#nmProduto").val('').trigger("chosen:updated");
          $("#vlProduto").val('');
          $("#qtProduto").val('');
         
          /* Define o foco para a seleção de produtos */
          $("#nmProduto").chosen().trigger('chosen:activate');
       }
    })

    /* Ao clicar na ação delete remove a linha dinamicamente da tabela */
    $(document).on("click",".delete",function() {
       /* Remove a linha referente ao produto clicado */
       $(this).parent().parent().remove();
       
       /* Se existir somente um produto no pedido, e for removido, o foot da tabela fica invisível
          O foot é usado para mostrar o valor total do pedido */               
       if($(".table-produtos tbody tr").length === 0)
          $(".table-produtos tfoot").addClass("invisible");
       
       /* Após exclusão da linha, os valores do pedido são atualizados */
       atualizaVlPedido();
    })

    /* Validação do Formulário */
    function validaForm()
    {     
       var formValid = true;
       if($("#nmProduto").val() === "")
          formValid = false;
       if($("#vlProduto").val() === "")
          formValid = false;
       if($("#qtProduto").val() === "")
          formValid = false;

       if(!formValid)
       {
          /* Remove a classe invisible do elemento msgValidaForm */
          $("#msgValidaForm").removeClass("invisible")
          /* Após 4 segundo a mensagem desaparece com a classe invisible sendo novamente adicionada */
          setTimeout(function(){
             $("#msgValidaForm").addClass("invisible")
          }, 4000);

          return false;
       } else 
          return true;
    }

    /* Atualiza Valor Total do Pedido */
    function atualizaVlPedido()
    {
       /* Define o valor do pedido */
       var vlTotalPedido = 0;

       /* Varre todos os valores dos produtos da tabela */
       $(".table-produtos tbody tr td:nth-child(4)").each(function() {
          vlTotalPedido += parseFloat($(this).text());
       })
       /* Atualiza o valor do pedido na tabela */
       $("#vlTotalPedido").text(vlTotalPedido.toFixed(2));
    }

 })     