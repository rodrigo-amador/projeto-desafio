import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
// Cria uma variavel que valida se o tipo_usuario teria acesso - simplificando para as validações de token nas rotas
// 100 : somente administrador
// 200 : administrador e estudante
const nivelDeRole = {
    'admin': [100],
    'estudante': [100, 200]
}

const RoleGuard = (role: string): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            if (nivelDeRole[role].includes(request.user.tipo_usuario)) {
                return true;
            }

            return false;
        }
    }

    return mixin(RoleGuardMixin);
}

export default RoleGuard;