
export const main = (req, res) => res.render('main')

export const about = (req, res) => res.render('about')

export const blog = (req, res) => res.render('blog')

export const teachers = (req, res) => res.render('teachers')

export const registration = (req, res) => res.render('registration', {layout:'register.handlebars'})

export const course = (req, res) => res.render('course')