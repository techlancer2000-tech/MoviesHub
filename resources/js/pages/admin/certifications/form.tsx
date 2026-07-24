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
    index as certificationsIndex,
    store as certificationsStore,
    update as certificationsUpdate,
} from '@/routes/certifications';

interface Certification {
    id?: number;
    name: string;
    code: string;
    description?: string;
    is_active: boolean;
}

interface CertificationFormData {
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    _method?: 'put';
}

interface Props {
    certification?: Certification | null;
}

export default function CertificationForm({ certification }: Props) {
    const isEdit = Boolean(certification?.id);

    const toast = useFlashToast();

    const { data, setData, post, processing, errors } =
        useForm<CertificationFormData>({
            name: certification?.name ?? '',
            code: certification?.code ?? '',
            description: certification?.description ?? '',
            is_active: certification?.is_active ?? true,
        });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            setData('_method', 'put');
        }

        post(
            isEdit
                ? certificationsUpdate(certification!.id!).url
                : certificationsStore().url,
            {
                forceFormData: true,

                onSuccess: () => {
                    toast({
                        title: 'Success',
                        description: isEdit
                            ? 'Certification updated successfully.'
                            : 'Certification created successfully.',
                    });
                },
            },
        );
    };

    const error = (field: keyof CertificationFormData) =>
        errors[field] && (
            <p className="text-sm text-destructive">{errors[field]}</p>
        );

    return (
        <>
            <Head title={isEdit ? 'Edit Certification' : 'Add Certification'} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit
                                ? 'Edit Certification'
                                : 'Add Certification'}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage certification details for movies.
                        </p>
                    </div>

                    <Button variant="outline" asChild>
                        <Link href={certificationsIndex()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>Certification Information</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Certification Name *</Label>

                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Universal"
                                    />

                                    {error('name')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Certification Code *</Label>

                                    <Input
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value)
                                        }
                                        placeholder="U"
                                    />

                                    {error('code')}
                                </div>
                            </div>

                            <div>
                                <Label>Description *</Label>

                                <Textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Enter certification description"
                                    rows={4}
                                />

                                {error('description')}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Active Status</Label>

                                    <p className="text-sm text-muted-foreground">
                                        Enable this certification for movies.
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
                                          ? 'Update Certification'
                                          : 'Create Certification'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
