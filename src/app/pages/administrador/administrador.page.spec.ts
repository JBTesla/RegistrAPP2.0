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


  it('1. Levantar la página admin', ()=>{
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    let nom_completo = app.usuario.controls['nom_completo'];
    let email = app.usuario.controls['email'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let semestre = app.usuario.controls['semestre'];
    let password = app.usuario.controls['password'];

    rut.setValue('17888444-k');
    nom_completo.setValue('error.exe');
    email.setValue('er.ro@gmail.cl');
    fecha_nac.setValue('2022-09-07');
    semestre.setValue('4');
    password.setValue('error123');
    expect(app.usuario.valid).toBeFalse();
  });

  it('3. Formulario válido', ()=> {
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nom_completo = app.usuario.controls['nom_completo'];
    let email = app.usuario.controls['email'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let semestre = app.usuario.controls['semestre'];
    let password = app.usuario.controls['password'];
   
    rut.setValue('11.694.566-5');
    nom_completo.setValue('elza pato');
    email.setValue('er.ro@gmail.cl');
    fecha_nac.setValue('2022-09-07');
    semestre.setValue('4');
    password.setValue('error123');
    expect(app.usuario.valid).toBeFalse();
    
    expect(app.usuario.valid).toBeTrue();
  });
  

  it('4. Ejecutar el boton agregar', ()=>{
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nom_completo = app.usuario.controls['nom_completo'];
    let email = app.usuario.controls['email'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let semestre = app.usuario.controls['semestre'];
    let password = app.usuario.controls['password'];
    
    rut.setValue('20.047.654-9');
    nom_completo.setValue('admin');
    email.setValue('admin@duocuc.cl');
    fecha_nac.setValue('1990-09-07');
    semestre.setValue('4');
    password.setValue('adm123');
    expect(app.usuario.valid).toBeFalse();
  
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