import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов",
  }),
  birthdate: z.string().refine((date) => {
    const today = new Date();
    const selected = new Date(date);
    return selected <= today;
  }, "Дата рождения не может быть в будущем"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserInputFormProps {
  onSubmit: (values: UserFormValues) => void;
  isLoading: boolean;
}

export function UserInputForm({ onSubmit, isLoading }: UserInputFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      birthdate: "",
    },
  });

  const handleSubmit = async (values: UserFormValues) => {
    try {
      setSubmitting(true);
      onSubmit(values);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить данные. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-40 p-6 rounded-lg shadow-[0_0_15px_rgba(138,79,255,0.5)] mb-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block text-lg font-serif text-[#D4AF37]">
                  Ваше имя
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Введите ваше имя"
                    className="w-full px-4 py-3 bg-gray-900 border border-[#8A4FFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white"
                    disabled={isLoading || submitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block text-lg font-serif text-[#D4AF37]">
                  Дата рождения
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    max={today}
                    className="w-full px-4 py-3 bg-gray-900 border border-[#8A4FFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white"
                    disabled={isLoading || submitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#4A154B] to-[#8A4FFF] text-white font-medium rounded-md hover:opacity-90 transition-opacity"
            disabled={isLoading || submitting}
          >
            {isLoading || submitting
              ? "Загрузка..."
              : "Получить прогноз на сегодня"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
