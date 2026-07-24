import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useFlashToast } from '@/hooks/use-flash-toast';
import {
    index as languagesIndex,
    store as languagesStore,
    update as languagesUpdate,
} from '@/routes/languages';

interface Language {
    id?: number;
    name: string;
    native_name?: string;
    code: string;
    locale?: string;
    flag?: string;
    is_active: boolean;
}

interface LanguageFormData {
    name: string;
    native_name: string;
    code: string;
    locale: string;
    flag: File | null;
    is_active: boolean;
    _method?: 'put';
}

interface Props {
    language?: Language | null;
}

export default function LanguageForm({ language }: Props) {
    const isEdit = Boolean(language?.id);

    const toast = useFlashToast();

    const { data, setData, post, processing, errors } =
        useForm<LanguageFormData>({
            name: language?.name ?? '',
            native_name: language?.native_name ?? '',
            code: language?.code ?? '',
            locale: language?.locale ?? '',
            flag: null,
            is_active: language?.is_active ?? true,
        });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            setData('_method', 'put');
        }

        post(
            isEdit ? languagesUpdate(language!.id!).url : languagesStore().url,
            {
                forceFormData: true,

                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: isEdit
                            ? 'Language updated successfully.'
                            : 'Language created successfully.',
                    });
                },
            },
        );
    };

    const error = (field: keyof LanguageFormData) =>
        errors[field] && (
            <p className="text-sm text-destructive">{errors[field]}</p>
        );

    return (
        <>
            <Head title={isEdit ? 'Edit Language' : 'Add Language'} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Language' : 'Add Language'}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage language details for movies.
                        </p>
                    </div>

                    <Button variant="outline" asChild>
                        <Link href={languagesIndex()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>Language Information</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Language Name *</Label>

                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="English"
                                    />

                                    {error('name')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Native Name</Label>

                                    <Input
                                        value={data.native_name}
                                        onChange={(e) =>
                                            setData(
                                                'native_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="English"
                                    />

                                    {error('native_name')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Language Code *</Label>

                                    <Input
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value)
                                        }
                                        placeholder="en"
                                    />

                                    {error('code')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Locale</Label>

                                    <Input
                                        value={data.locale}
                                        onChange={(e) =>
                                            setData('locale', e.target.value)
                                        }
                                        placeholder="en_US"
                                    />

                                    {error('locale')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Flag</Label>

                                    <Input
                                        type="file"
                                        onChange={(e) =>
                                            setData(
                                                'flag',
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />

                                    {error('flag')}
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Active Status</Label>

                                    <p className="text-sm text-muted-foreground">
                                        Enable this language for movies.
                                    </p>
                                </div>

                                <Switch
                                    checked={data.is_active}
                                    onCheckedChange={(value) =>
                                        setData('is_active', value)
                                    }
                                />
                            </div>

                            {error('is_active')}

                            <div className="flex justify-end">
                                <Button disabled={processing}>
                                    {processing
                                        ? 'Saving...'
                                        : isEdit
                                          ? 'Update Language'
                                          : 'Create Language'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
