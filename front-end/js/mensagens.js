const API_MENSAGENS =
'http://localhost:3000/mensagens';

document
.getElementById(
    'form-mensagem'
)
.addEventListener(
'submit',
async(event)=>{

    event.preventDefault();

    await fetch(
        API_MENSAGENS,
        {

            method:'POST',

            headers:{
                'Content-Type':
                'application/json'
            },

            body:JSON.stringify({

                nome:
                document.getElementById(
                    'nome-msg'
                ).value,

                email:
                document.getElementById(
                    'email-msg'
                ).value,

                assunto:
                document.getElementById(
                    'assunto-msg'
                ).value,

                mensagem:
                document.getElementById(
                    'mensagem-msg'
                ).value

            })

        }
    );

    document
    .getElementById(
        'form-mensagem'
    )
    .reset();

});