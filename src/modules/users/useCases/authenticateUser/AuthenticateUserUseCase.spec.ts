import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError"

let usersRepositoryInMemory: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to create a session', async () => {
    const user = {
      name: 'Tester',
      email: 'test@example.com',
      password: 'test'
    }

   await createUserUseCase.execute(user)

    const response = await authenticateUserUseCase.execute({
     email: user.email,
     password: user.password
   })

   expect(response).toHaveProperty('token')

  })

  it('should not be able to create a session when user not exists', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'notexists@email.com',
        password: 'notexists'
      })

    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })

  it('should not be able to create a session when password is wrong', async () => {
    expect(async () => {
      const user = {
        name: 'Tester',
        email: 'test@example.com',
        password: 'test'
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong'
      })

    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })
})
