import { useState } from "react"

function Login() {
  const [usuario, setUsuario] = useState('')
  const [passwd, setPasswd] = useState('')
  const [ token, setToken ] = useState('')
  const usuarioOnChange = (e) => {
    e.preventDefault()
    setUsuario(e.target.value)
  }

  const passwdOnChange = (e) => {
    e.preventDefault()
    setPasswd(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = 'http://localhost:3000/login'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario,
          passwd
        })
      }
      fetch(url, options)
        .then(response => response.json())
        .then(response => setToken(response))

      localStorage.setItem('token', token.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" name="usuario" id="usuario" onChange={usuarioOnChange} />
        </div>
        <div>
          <label htmlFor="passwd">Contraseña</label>
          <input type="password" onChange={passwdOnChange} name="passwd" id="passwd" />
        </div>
        <div>
          <button type="submit">Iniciar</button>
        </div>
      </form>
    </>
  )
}

export { Login }