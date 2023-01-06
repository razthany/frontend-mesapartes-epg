export interface UserModel {
  email: string
  id: number
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: string
  first_name: string
  last_name: string
}

export interface PermissionsModel {
  codename: string
  model: string
}

export interface MenuModel {
  name: string
  href: string
  icon: string
  current: boolean
  profiles: string[]
}

export interface UsuarioGrupo {
  id: number
  name: string
}

export interface TramiteModel {
  id: number
  persona_id: number
  persona_entidad: string
  num_documento: string
  tipo_tramite_id: number
  tipo_tramite: string
  asunto: string
  num_doc_referencia: number
  usuario_id: number
  usuario: string
  sede_id: number
  sede: string
  fecha_hora: string

}
