function verificarAcesso(...acessosPermitidos) {

    return (req, res, next) => {

        const userAcesso = req.user.acesso;

        if(!acessosPermitidos.includes(userAcesso)) {
            return res.status(403).json({
                erro: 'Você não tem permissão para realizar essa ação'
            });
        }

        next();
    };
}

module.exports = verificarAcesso;