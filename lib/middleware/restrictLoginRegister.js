module.exports = (req,res,next) => {
    if (req.session.User){
        return res.render('main_menu_logged')
    }else{
        return next()
    }
}