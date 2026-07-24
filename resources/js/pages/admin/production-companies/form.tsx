import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { useFlashToast } from '@/hooks/use-flash-toast';

import {
    index as productionCompanyIndex,
    store as productionCompanyStore,
    update as productionCompanyUpdate,
} from '@/routes/production-companies';

interface ProductionCompany {
    id?: number;
    name: string;
    slug: string;
    logo?: string | null;
    description?: string | null;
    is_active: boolean;
}

interface ProductionCompanyFormData {
    name: string;
    slug: string;
    logo: File | null;
    description: string;
    is_active: boolean;
    _method?: 'put';
}

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Country {
    id: number;
    name: string;
}

interface Gender {
    value: number;
    name: string;
}

interface Props {
    production_company?: ProductionCompany | null;
    countries: Country[];
    genders: Gender[];
}

export default function ProductionCompanyForm({
    production_company,
    countries,
    genders,
}: Props) {
    const isEdit = Boolean(production_company?.id);
    const toast = useFlashToast();
    const { data, setData, post, processing, errors } =
        useForm<ProductionCompanyFormData>({
            name: production_company?.name ?? '',

            slug: production_company?.slug ?? '',

            logo: null,

            description: production_company?.description ?? '',

            is_active: production_company?.is_active ?? true,
        });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            setData('_method', 'put');
        }

        post(
            isEdit
                ? productionCompanyUpdate(production_company!.id!).url
                : productionCompanyStore().url,
            {
                forceFormData: true,

                onSuccess: () => {
                    toast({
                        title: 'Success',

                        description: isEdit
                            ? 'Production company updated successfully.'
                            : 'Production company created successfully.',
                    });
                },
            },
        );
    };

    const error = (field: keyof ProductionCompanyFormData) =>
        errors[field] && (
            <p className="text-sm text-destructive">{errors[field]}</p>
        );

    return (
        <>
            <Head
                title={
                    isEdit
                        ? 'Edit Production Company'
                        : 'Add Production Company'
                }
            />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit
                                ? 'Edit Production Company'
                                : 'Add Production Company'}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage production companies for movies.
                        </p>
                    </div>

                    <Button variant="outline" asChild>
                        <Link href={productionCompanyIndex()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>Production Company Information</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Production Company Name *</Label>

                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Paramount Pictures"
                                    />

                                    {error('name')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Slug *</Label>

                                    <Input
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                        placeholder="paramount-pictures"
                                    />

                                    {error('slug')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Logo</Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'logo',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />

                                {error('logo')}
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>

                                <Textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Enter description"
                                    rows={5}
                                />

                                {error('description')}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Active Status</Label>

                                    <p className="text-sm text-muted-foreground">
                                        Enable this production company for
                                        movies.
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
                                          ? 'Update Production Company'
                                          : 'Create Production Company'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
