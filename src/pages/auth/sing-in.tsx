import { Helmet } from "react-helmet-async";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/sign-in";

const singInFormSchema = z.object({
  email: z.string().email(),
});

type SingInForm = z.infer<typeof singInFormSchema>;

export function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SingInForm>();

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSingIn(data: SingInForm) {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de autenticação para o seu e-mail", {
        action: {
          label: "Reenviar",
          onClick: () => handleSingIn(data),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="link" asChild className="absolute right-8 top-8">
          <Link to="/sing-up">Nono estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="ga-2 flex flex-col text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSingIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input {...register("email")} id="email" type="email" />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
