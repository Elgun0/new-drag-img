let dragc=document.querySelector(".drag-content")
dragc.addEventListener("dragover",function(e){
    e.preventDefault()
    this.classList.add("active")
    this.style="background:yellowgreen;color:white"
})
dragc.addEventListener("dragleave",function(){
    this.classList.remove("active")
    this.style="background:transparent;color:black"
})
dragc.addEventListener("drop",function(e){
    e.preventDefault()
    this.classList.remove("active")
    this.style="background:transparent;color:black"
    AddTableData(e.dataTransfer.files)
})
function AddTableData(img){
    const tr =document.createElement("tr")
    for(var myimg of img){
        var reader=new FileReader()
        if(myimg.type.match("image*")){
            reader.onload=function(read){
                const imgtd=document.createElement("td")
                const img=document.createElement("img")
                img.src=read.target.result
                img.width=200
                img.height=200
                imgtd.appendChild(img)
                tr.insertBefore(imgtd,tr.firstChild)
            }
            reader.readAsDataURL(myimg)
            // Name
            const nametd=document.createElement("td")
            nametd.innerText=myimg.name
            tr.appendChild(nametd)
            // Size
            const sizetd=document.createElement("td")
            sizetd.innerText=(myimg.size/1024).toFixed(2)+"kb"
            tr.appendChild(sizetd)
            // Date
            const datetd=document.createElement("td")
            datetd.innerText=myimg.lastModifiedDate
            tr.appendChild(datetd)
            // Type
            const typetd=document.createElement("td")
            typetd.innerText=myimg.type
            tr.appendChild(typetd)
            // Delete
            const itag=document.createElement("i")
            itag.className="fas fa-times fa-2x itag";
            itag.style="color:red;cursor:pointer"
            tr.appendChild(itag)
            itag.onclick=function(){
                this.parentNode.parentNode.remove()
            }
            document.querySelector(".drop-table tbody").appendChild(tr)
            document.querySelector(".drop-table").classList.remove("d-none")
        }
    }
}