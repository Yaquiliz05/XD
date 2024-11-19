import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Protected() {
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          throw new Error('Failed to fetch user data')
        }
      } catch (error) {
        console.error(error)
        navigate('/login')
      }
    }

    fetchUser()
  }, [navigate])

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        setEditMode(false)
      } else {
        throw new Error('Failed to update user data')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Datos del Usuario</h1>
      {editMode ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label>Nombre: </label>
            <input type="text" name="nombre" value={user.nombre} onChange={handleInputChange} />
          </div>
          <div>
            <label>Apellido: </label>
            <input type="text" name="apellido" value={user.apellido} onChange={handleInputChange} />
          </div>
          <div>
            <label>DNI: </label>
            <input type="text" name="dni" value={user.dni} onChange={handleInputChange} />
          </div>
          <div>
            <label>Fecha de Nacimiento: </label>
            <input type="date" name="fechaNacimiento" value={user.fechaNacimiento} onChange={handleInputChange} />
          </div>
          <div>
            <label>Salario: </label>
            <input type="number" name="salario" value={user.salario} onChange={handleInputChange} />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      ) : (
        <div>
          <p>Nombre: {user.nombre}</p>
          <p>Apellido: {user.apellido}</p>
          <p>DNI: {user.dni}</p>
          <p>Fecha de Nacimiento: {user.fechaNacimiento}</p>
          <p>Salario: {user.salario}</p>
          <button onClick={handleEdit}>Editar</button>
        </div>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </>
  )
}

export { Protected }