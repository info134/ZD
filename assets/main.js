const app = Vue.createApp({
    data() {
        return {
            details: [],
            checked: false,
            loading: false,
        }
    },
    
    methods: {
        async addToCart(who) {
            this.loading = true;
            const [organization, search] = await Promise.all([getOrg(), getSearch()]);
            const getSearch2 = search ? search : undefined;
            let vm = this
            vm.product = organization.name

            if(who==="HelpCenter"){
                this.populateDetails(getSearch2[0].results)
                this.helpcentercount = getSearch2[0].results.length
                this.display ="none"
            }
            else if(who==="tickets_write"){
                this.populateDetails(getSearch2[1].results)
                this.superbrukercount = getSearch2[1].results.length
                this.display ="none"
            }
            else if(who==="tickets_read"){
                this.populateDetails(getSearch2[2].results)
                this.ticketreadcount = getSearch2[2].results.length
                this.display="none"
            }
            else if(who==="info"){
                this.clear()
                this.informasjon = "Superbrukere er de som kan melde inn saker til Sikri. \n \n De som har taggen tickets_read kan lese sakene til andre i sin organisasjon. \n \n De som har artikkel tilgang har bare tilgang til å lese artikler på Sikri sitt hjelpesenter. \n\n Brukere som er suspendert er streket over \n\n Brukere vil komme opp i treff på alle organisasjoner de er tilknyttet og ikke bare deres hovedorganisasjon \n\n Gjør du endringer på brukere eller organisasjoner vil det ta 5 minutter før de vises her \n\n Klikk på personene for å skifte mellom navn og epost visning\n\n Trykk på superbrukere -> trykk ctrl + a og så ctrl + c for å raskt kopiere ut bruker informasjon"
                this.display="none"
            }
            else{
                info=["ingenting"]
            }
          },
        populateDetails(input){
            let vm = this
            
            input.forEach((value, index) => {
                vm.details.push(value);
            })
            this.loading = false;
        },
        clear(){ 
            this.informasjon = '';
            this.details = [];
            this.loading = false;
            
        },
    
        test(event) {
            this.checked = !this.checked
            const element = document.querySelector('.emaillist');
            element.classList.add('animate__animated', 'animate__flip');
        },
        click(input){
            list = ["read", "super", "center", "info"]
            
            list.forEach(value => {
                if (value === input){
                    let style = document.getElementById(value).style
                    style.backgroundColor = ' rgb(255, 131, 199)'
                    document.getElementById(value).disabled = true;
                    setTimeout(function(){
                        document.getElementById(value).disabled = false; 
                    },900)
                }
                else{
                    document.getElementById(value).style.backgroundColor = 'rgb(192, 226, 1)'
                }
            })
        }
          
    },
    async mounted(){
        var a = await this.addToCart("tickets_write")
        var b = await this.addToCart("HelpCenter")
        var c = await this.addToCart("tickets_read")
        this.clear()
        this.display = "inline",
        this.image = 'https://sikri.zendesk.com/hc/article_attachments/360020334939/sikri.jpg'
        document.body.style.display = "block";
    },
})
