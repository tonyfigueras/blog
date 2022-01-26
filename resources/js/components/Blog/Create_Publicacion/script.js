export default {
    data() {
        return {
            
            publicaciones: {},
            dialog: null,
            publicacion: null,
            showModal: false,
            rout: "",
            err: false,
            msg: null,
            form: {
                status: "0",
                id: "",
               resumen: "",
               fecha_publicacion:"",
               categoria:"",
               autor:"",
               texto:"",
               titulo:"",
              
               
            },
            datos: null,
            busy: false,
            search: null,
            errors: [],
            pagination: {
                current: 1,
                total: 0
            }
        };
    },

    computed: {},
    created: function() {
        this.allpublicacion();
        
    },
    mounted() {
        this.allpublicacion();
       
    },
    methods: {
        deletepublicacion(publicacion) {
            var _this = this;

            const swalWithBootstrapButtons = swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons
                .fire({
                    title: "Seguro que desea eliminar la Información?",
                    text: "Este Proceso no puede ser revertido!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Eliminar!",
                    cancelButtonText: "Cancelar             !",
                    reverseButtons: true
                })
                .then(result => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            "La información ha sido Eliminada.",
                            "success"
                        );
                        axios
                            .delete("/delete/" + publicacion.id)
                            .then(function(response) {
                                _this.allpublicacion();
                            })
                            .catch(error => {
                                console.log("Delete car: " + error);
                            });
                    } else if (
                       
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "Your imaginary file is safe :)",
                            "error"
                        );
                    }
                });
        },
        validat() {
            if (!this.form.titulo) {
                return {
                    err: true,
                    msg: "Debe escribir un titulo."
                };
            }
            if(!this.form.fecha_publicacion)
            {return {
                err: true,
                msg: "Debe seleccionar una fecha de publicacion."
            };}

            if (!this.form.autor) {
                return {
                    err: true,
                    msg: "Debe escribir un autor."
                };
            }
            if(!this.form.resumen)
           { return {
                err: true,
                msg: "Debe escribir un resumen."
            };}
                    
            if (!this.form.categoria) {
                return {
                    err: true,
                    msg: "Debe seleccionar una categoria."
                };
            }
           
            if (!this.form.texto) {
                return {
                    err: true,
                    msg: "Debe escribir un texto."
                };
            }
            

            return {
                err: false,
                msg: null
            };
        },
       

        async Addpublicacion() {
            let valid = await this.validat();
            if (!valid.err) {
                try {
                   var _this = this;
                 if (this.form.status == "1") {
                        this.rout = "/add";
                    } else {
                        this.rout = "/edit/" + this.form.id;
                    }
                    axios.post(this.rout, this.form).then(function(response) {
                          if (response.data.status === "error") {
                           
                              const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                background: '#FFD733' ,
                                didOpen: (toast) => {
                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                              })
                              
                              Toast.fire({
                                icon: 'error',
                                title: 'Error el campo e-mail se encuentra ya registrado'
                              })
                        
                        }
                            else{
                                _this.form.id = _this.form.resumen = _this.form.fecha_publicacion = 
                                _this.form.titulo = _this.form.autor = _this.form.texto = 
                                _this.form.categoria  =
                                "";
                              
                               const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                background: '#33FF93' ,
                                didOpen: (toast) => {
                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                              })
                              
                              Toast.fire({
                                icon: 'success',
                                title: 'Información guardada exitosamente..!!!'
                              })
                                $("#myModalcarga").modal("hide");
                                _this.allpublicacion();
                            }
                          
                        
                      
                    });

                } catch (e) {
                    ErrorHandler.render(e);
                    this.busy = false;
                }
            } else {
                    const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#FFD733' ,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: valid.msg
                  })
            }
        },

       
        showpublicacion(publicacion) {
          
          this.form.status = "1";
    
              if (publicacion) {
                this.form.status = "0";
                this.form.id = publicacion.id;
                this.form.resumen = publicacion.resumen;
                this.form.titulo = publicacion.titulo;
                this.form.fecha_publicacion = publicacion.fecha_publicacion;
                this.form.autor = publicacion.autor;
                this.form.categoria = publicacion.categoria;
                this.form.texto = publicacion.texto;
                
                 
            }
            else
            {
                this.form.id = this.form.resumen = this.form.fecha_publicacion = this.form.titulo = 
                this.form.autor = this.form.texto = this.form.categoria  =
                "";
            }
            $("#myModalcarga").modal("show");
        },

        

        allpublicacion() {
              axios
                .post(
                    "/allpublicacion?page=" + this.pagination.current,

                    {
                        params: {
                            search: this.search
                        }
                    }
                )
                .then(response => {
                    this.publicaciones = response.data.data;
                    this.pagination.current = response.data.current_page;
                    this.pagination.total = response.data.last_page;
                });
        },
        onPageChange() {
            this.allpublicacion();
        },

        find() {
            this.wait = true;
            this.page = 1;
            this.total = 0;
            this.allpublicacion();
            this.wait = false;
        },
        modal_carga() {
            this.modal = true;
        }
    }
};
