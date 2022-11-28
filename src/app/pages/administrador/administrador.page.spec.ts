import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AdministradorPage } from "./administrador.page";


describe('PRUEBA UNITARIAS: administrador', ()=>{
  
  //configurar nuestro ambiente de pruebas:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        AdministradorPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página home', ()=>{
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    rut.setValue('17888444-k');

    expect(app.usuario.valid).toBeFalse();
  });

  it('3. Formulario válido', ()=> {
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    rut.setValue('17888444-k');
    nombre.setValue('Alambrito');
    
    expect(app.usuario.valid).toBeTrue();
  });
  

  it('4. Ejecutar el boton agregar', ()=>{
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nom_completo'];
    rut.setValue('20.047.654-9');
    nombre.setValue('admin');
  
    app.registrar();

    expect(app.v_agregar).toBeTrue();
  });


  /* it('5. Tener usuarios en firebase', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    app.listar();

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
  }); */


});