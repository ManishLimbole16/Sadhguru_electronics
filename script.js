function submitFun(){
    const submit=document.getElementById("submit");
    submit.addEventListener('click',(event)=>{
        event.preventDefault();
        submit.disabled = true;
        const name = document.getElementById("name").value;
        // const email = document.getElementById("email").value;
        // const subject = document.getElementById("subject").value;
        // const message = document.getElementById("message").value;        
        console.log(name)
        // console.log(name)
        // console.log(name)
        // console.log(name)
        fetch(`http://localhost:3000/submit?name=${name}&email=${email}&subject=${subject}&message=${message}&`)
        .then(response=>{return response.text()})
        .then(data=>{console.log(data)
        document.getElementById("name").value = '';
            // document.getElementById("email").value = '';
            // document.getElementById("subject").value = '';
            // document.getElementById("message").value = '';

                submit.disabled = false;}
        )
    })
    
}