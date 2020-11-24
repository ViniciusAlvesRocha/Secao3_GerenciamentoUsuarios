class UserController{
    
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)
        this.onSubmit()
    }

    onSubmit(){
        //let _this = this//ao ivés de fazer isso pode se usar aurrow functions
        this.formEl.addEventListener("submit", (e)=>{
            e.preventDefault()
            let btn = this.formEl.querySelector("[type=submit]")
            btn.disabled = true//quando o javascript ler o document, vai desabilitar todo o botão do formulário
            
            let values = this.getValues()

            if(!values) return false //se ele verificar se values for false, vai parar de executar o código
            this.getPhoto().then(
                (content)=>{//callback executada quando tudo der certo
                    values.photo = content;

                    this.addLine(values);
                    //para preencher com vazio todos os campos do formulário:
                    this.formEl.reset()
                    btn.disabled = false;
                },
                function(e){//callback executada quando der erro
                    console.error(e)
                }
            )
           
        })

    }

    getPhoto(){
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{
                if(item.name === "photo"){
                    return item
                }
            });

            let file = elements[0].files[0]
            fileReader.onload = ()=>{//metodo onload serve para ele carregar a foto(terminar de ler o arquivo), e quando carregá-la(ler) ele vai chamar a callback
                resolve(fileReader.result)
            }
            //evento do fileReader para erros:
            fileReader.onerror = (e)=>{
                reject(e)
            }
            if(file){
                fileReader.readAsDataURL(file);
            }else{
                resolve("dist/img/boxed-bg.jpg");
            }
            })
        
    }

    getValues(){//quando vai pegar os valores passa campo por campo
        
        let user = {};
        let isValid = true;
         //para cada campo que vc encontrar no formulário, execute o código da função lambda:
         [...this.formEl.elements].forEach((field, index)=>{//field = elemento do array, index = index do campo


            //validação para verificar se os campos que precisam ser preenchidos foram preenchidos:
            if(["name","email","password"].indexOf(field.name) > -1 && !field.value){
                //responsavel por encontrar o elemento pai do input e adicionar a ele a classe has-error:
                field.parentElement.classList.add("has-error")
                isValid = false;
            }

           if(field.name=="gender" && field.checked){
                user[field.name] = field.value
            }
            else if(field.name=="admin"){
                user[field.name] = field.checked;
            }
            else{
                user[field.name] = field.value
            }
            console.log(field);
            console.log(field.id, field.name, field.value, index);
        
        })
        
        if(!isValid){//não vai inserir objeto nenhum no formulário caso um dos campos não estiver preenchido
            return false//return false = responsavel por parar a execução
        }
        var objectUser = new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email, 
            user.password,
            user.photo,
            user.admin
        
        )

    return objectUser
    }


    //função para dkicionar linha na nossa tabela:
    addLine(dataUser){
    
    let tr = document.createElement('tr')
    //console.log("Valor do dataUser:::");
    //console.log(dataUser);
    tr.dataset.user = JSON.stringify(dataUser)//vai converter o objeto para string(Serialização)
    tr.innerHTML =  `
    <tr>
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admim)?"Sim":"Não"}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
`
//inserindo conteudo HTML utilizando TamplateString(admite quebra de linha):
    this.tableEl.appendChild(tr)
 
    //atualizando a informação de quantos usuários existem na base de dados:
    this.updateCount()

}

    //método responsável por calcular aquantidade de usúarios e administradores todas as vezes que vc faz uma nova inserção na tabela:
    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;
        //[...this.tableEl.children].forEach(tr=>{
            numberUsers++
            let meuJson = `{
                "nome": "Vinicius",
                "cidade": "Muzambinho",
                "bairro": "Por do Sol"
            }`
            //console.log(tr.dataset.user);
            console.log(JSON.parse(meuJson));//JSON.parse = vai converter a string para objeto novamente
        //})
    }
}//fechamento da classe UserController