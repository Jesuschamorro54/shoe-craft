from flask import Request


def generate_event(request: Request) -> dict:
    event = {
        'body': request.json if request.method == 'POST' else None,
        'queryStringParameters': dict(request.args),
        'pathParameters': request.view_args,
        'request': {
            'headers': dict(request.headers),
            'ip_client': request.remote_addr,
            'cookies': dict(request.cookies),
            'method': request.method
        }
    }

    return event