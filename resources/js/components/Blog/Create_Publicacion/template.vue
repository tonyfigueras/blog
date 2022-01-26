<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Lista de Publicaciones</div>

                    <v-form>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>
                            <v-text-field
                                label="Buscar"
                                :disabled="busy"
                                v-on:keyup="find"
                                v-model="search"
                                color="dark"
                                hide-details
                                outlined
                                dense
                            ></v-text-field>

                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-form>

                    <div class="card-body">
                        <button
                            class="btn btn-success"
                            data-toggle="modal"
                            @click.prevent="showpublicacion(publicacion)"
                        >
                            <i class="fas fa-plus"></i>
                            Nueva Publicación
                        </button>
                    </div>

                    <div class="card-body">
                        <table class="table table-striped" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Titulo</th>
                                     <th scope="col">Resumen</th>
                                     <th scope="col">Categoria</th>
                                     <th scope="col">Autor</th>
                                     <th scope="col">Fecha de Publicación</th>
                                     <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="publicacion in publicaciones" :key="publicacion.id">
                                  
                                    <td>{{publicacion.id }}</td>
                                    <td>{{ publicacion.titulo }}</td>
                                    <td>{{ publicacion.resumen }}</td>
                                    <td>{{ publicacion.categoria }}</td>
                                    <td>{{ publicacion.autor }}</td>
                                    <td>{{ publicacion.fecha_publicacion }}</td>
                                    <td
                                        @click="showpublicacion(publicacion)"
                                        class="btn btn-info "
                                    >
                                        <i class="far fa-edit"></i>
                                    </td>
                                    <td
                                        @click.prevent="deletepublicacion(publicacion)"
                                        class="btn btn-danger"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <v-pagination
                        v-model="pagination.current"
                        :length="pagination.total"
                        @input="onPageChange"
                    ></v-pagination>
                </div>
            </div>
        </div>

        <!-- Moda Carga de Datos -->

        <div id="myModalcarga" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <!-- Modal content-->
                <div class="modal-content">
                    <h5 class="modal-title" id="Cargar Publicacion">
                        &nbsp;&nbsp;&nbsp; Información de la Publicacion
                    </h5>
                    <div class="modal-header">
                        <form class="row g-3" id="miForm" ref="textareaform">
                            <input type="hidden" v-model="form.status" />
                            <input type="hidden" v-model="form.id" />
                            
                            <div class="col-md-4">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Titulo</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="titulo"
                                    placeholder="Intoduzca un Titulo"
                                    v-model="form.titulo"
                                    
                                />
                            </div>
                              <div class="col-md-4">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Fecha de Publicacion</label
                                >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="fecha_publicacion"
                                    v-model="form.fecha_publicacion"
                                    required
                                />
                            </div>
                            
                            <div class="col-md-4">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Autor</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="celudar"
                                    placeholder="Intoduzca un Autor"
                                    v-model="form.autor"
                                    maxlength="10"
                                    
                                    
                                />
                            </div>
                         
                            <div class="col-md-6">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Resumen</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="resumen"
                                    placeholder="Intoduzca un Resumen"
                                    v-model="form.resumen"
                                />
                            </div>
                             <div class="col-md-6">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Categoria</label
                                >
                                 <select class='form-control' v-model='form.categoria'  >
                                     <option value='articulo'>Articulo</option>
                                     <option value='eventos'>Eventos</option>
                                     <option value='webinars'>Webinars</option>
                                     <option value='blog'>Blog</option>
                                    
                                </select>
                            
                            </div>
                             <div class="col-md-12">
                                <label
                                    for="validationDefault02"
                                    class="form-label"
                                    >Texto Publicacion</label
                                >
                               
                                <textarea class="form-control" name="textarea" v-model="form.texto" placeholder="Intoduzca el texto" rows="5" cols="100"></textarea>
                            </div>
                            
                          

                            

                            
                            <br />
                            <br />
                            <br />
                            <div class="col-md-12">
                                <button
                                    class="btn btn-success"
                                    @click.prevent="Addpublicacion()"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./script.js"></script>


