export const regExName : string = '[a-z A-Z]{3,30}'
export const regExPass : string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$"
export const regExMail : string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

export const regExPrice : string = '[0-9]+(\\.[0-9][0-9]?)?'
export const regExContact: string = '[- +()0-9]+'
