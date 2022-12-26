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
