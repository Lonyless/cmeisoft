import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bairro } from 'src/app/core/model/bairro.model';
import { Endereco } from 'src/app/core/model/endereco.model';
import { BairroService } from 'src/app/core/services/bairro.service';
import { CidadeService } from 'src/app/core/services/cidade.service';
import { EnderecoService } from 'src/app/core/services/endereco.service';
import { EnderecoEmmiterService } from 'src/app/core/services/endereco-emmiter.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css'],
})
export class EnderecoFormComponent implements OnInit {
  form: FormGroup;

  @Output() adicionou = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public enderecoService: EnderecoService,
    public bairroService: BairroService,
    public cidadeService: CidadeService,
    private inEventEmitterService: EnderecoEmmiterService,
    private outEventEmitterService: EnderecoEmmiterService
  ) {
    this.enderecoService = enderecoService;
    this.bairroService = bairroService;
    this.cidadeService = cidadeService;
  }

  bairros: Bairro[];
  _visibilidade: boolean;

  ngOnInit(): void {
    //nessa parte ele esta transmitindo a funcao onSubmit para o component crianca, preciso disso pois
    //só no component form-crianca é que vou estar criando tambem o endereco, então nao posso fazer
    //isso aqui. mas praticas ou nao, funciona
    if (this.inEventEmitterService.subsVar == undefined) {
      this.inEventEmitterService.subsVar = this.inEventEmitterService.invokeFirstComponentFunction.subscribe(
        (name: string) => {
          this.onSubmit();
          console.log("in")
        }
      );
    }

    this._visibilidade = true;

    this.bairroService.listar().subscribe((res) => {
      this.bairros = res;
    }).unsubscribe;

    //let cmei = this.route.snapshot.data['cmei']
    let endereco = [{ id: null, rua: null, numero: null, bairroId: null }];

    //POG
    //if (cmei[0] == null)
    //endereco = [{ id: null, nome: '', telefone: '', idEndereco: '', status: null }]

    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
    this.form = this.fb.group({
      id: [endereco[0].id],
      ruaEndereco: [endereco[0].rua, [Validators.required]],
      numeroEndereco: [endereco[0].numero, [Validators.required]],
      bairroId: [endereco[0].bairroId, [Validators.required]],
    });

    /*
    this.route.params.subscribe((params: any) => {
      const id = parseInt(params['id'])
      console.log(id)
      //dentro do observable que pega o id tem esse aqui q acha o aluno
      const aluno$ = this.alunoService.listarPorId(id)
      aluno$.subscribe( aluno => {
        this.updateForm(aluno)
      })
    })
    */
  }

  setar() {
    this.bairroService.listar().subscribe((res) => {
      (this.bairros = res),
        this.form.patchValue({
          bairroId: this.bairros[this.bairros.length - 1].id,
        });
    }).unsubscribe;
  }

  onSubmit() {
    const endereco = new Endereco(
      null,
      this.form.value.ruaEndereco,
      this.form.value.numeroEndereco,
      this.form.value.bairroId
    );

    console.log(endereco);
    this.enderecoService.adicionar(endereco).subscribe(
      (sucesso) => {
        this.outEventEmitterService.onEvent();
        console.log(sucesso);
      },
      (erro) => {
        console.log(erro);
      }
    );

    this.adicionou.emit();
  }

  validarCampo(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched;
  }

  cssErro(campo) {
    return {
      'has-error': this.validarCampo(campo),
    };
  }

  tabErro(campo) {
    return {
      dngr: this.validarCampo(campo),
    };
  }

  log() {
    console.log(this.form);
  }
}
